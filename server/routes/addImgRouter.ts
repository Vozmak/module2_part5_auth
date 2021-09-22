import { Request, Response } from 'express';
import { addImgGallery } from '../gallery/addImgGallery';
import { errorMessage } from '../function/errorMessageCheck';
import * as express from 'express';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const upload = await addImgGallery(req);

  errorMessage(res, upload, 400);

  res.end(JSON.stringify(upload));
});

export default router
