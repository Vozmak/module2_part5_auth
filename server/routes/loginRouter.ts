import { Request, Response } from 'express';
import { login } from '../login/login.js';
import { errorMessage } from '../functions/errorMessageCheck.js';
import * as express from 'express';

const router = express.Router();

router.post('/authorization', async (req: Request, res: Response) => {
  const resBody = await login(req);

  errorMessage(res, resBody, 406);

  res.end(JSON.stringify(resBody));
});

export default router;
