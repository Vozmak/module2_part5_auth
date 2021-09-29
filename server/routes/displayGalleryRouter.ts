import { Request, Response } from 'express';
import { displayGallery } from '../gallery/displayGallery.js';
import { errorMessage } from '../functions/errorMessageCheck.js';
import * as express from 'express';
const router = express.Router();

router.get('/gallery/:page/:limit/:filter', async (req: Request, res: Response) => {
  const gallery = await displayGallery(req);

  errorMessage(res, gallery, 404);

  res.end(JSON.stringify(gallery));
});

export default router
