import { Request, Response } from 'express';
import { displayGallery } from '../gallery/displayGallery';
import { errorMessage } from '../function/errorMessageCheck';
import * as express from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let gallery = await displayGallery(req);

  errorMessage(res, gallery, 404);

  res.end(JSON.stringify(gallery));
});

export default router
