import { NextFunction, Request, Response } from 'express';
import express from 'express';
import passport from "passport";
import cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import fileUpload from 'express-fileupload';
import bodyParser from "body-parser";
import { logger } from './logger/logger.js';
import loginRouter from './routes/loginRouter.js';
import displayGalleryRouter from './routes/displayGalleryRouter.js';
import addImgRouter from './routes/addImgRouter.js';
import signUpRouter from "./routes/signUpRouter.js";
import { connectDb } from './database/mongoDbConnect.js';
import { addImagesToDb } from './gallery/addImage/dbImagesCheck.js';
import { errorHandler } from "./middleware/errorHandler.js";
import config from 'config'

import('./middleware/auth.js');

const app = express();
const PORT: number = config.get('PORT');
const hostname: string = config.get('hostname');
const swaggerDocument = YAML.load(`server/swagger/swaggerAPI.yaml`);

connectDb()
  .then(() => {
    console.log('Connection success.');
    // addImagesToDb(`http://${hostname}:${PORT}`)
    //   .then(() => {
    //     console.log('Images add to db');
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   })
  })
  .catch(e => {
    console.log(e);
  });

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());
//app.all('*', authorizationChecker);
app.use(logger);
app.use(express.static('../client'));
app.use('/images', express.static(`server/gallery/images`));
app.use(fileUpload());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', loginRouter);
app.use('/', signUpRouter);
app.use('/', passport.authenticate('jwt', { session: false }), displayGalleryRouter);
app.use('/', passport.authenticate('jwt', { session: false }), addImgRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.end('Not Found');

  logger(`Page ${req.url} not found`);

  next();
});

app.use(errorHandler);

app.listen(PORT, hostname, () => {
  console.log(`Listening server: ${hostname}:${PORT}`);
  logger('Server start');
});
