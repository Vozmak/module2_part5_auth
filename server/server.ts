import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as fileUpload from 'express-fileupload';
import { logger } from './logger/logger';
import { authorizationChecker } from './middleware/authorizationChecker';
import loginRouter from './routes/loginRouter';
import displayGalleryRouter from './routes/displayGalleryRouter';
import addImgRouter from './routes/addImgRouter';

const app = express();
const PORT: number = 2000;
const hostname: string = '127.0.0.1';
const swaggerDocument = YAML.load(`server/swagger/swaggerAPI.yaml`);

app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.all('*', authorizationChecker);
app.use(logger);
app.use('/images', express.static(`server/gallery/images`));
app.use(fileUpload());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', loginRouter);
app.use('/', displayGalleryRouter);
app.use('/', addImgRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.writeHead(404);
  res.end('Not Found');

  logger(`Page ${req.url} not found`);

  next();
});

app.listen(PORT, hostname, () => {
  console.log(`Listening server: ${hostname}:${PORT}`);
  logger('Server start');
});
