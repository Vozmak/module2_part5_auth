import {NextFunction, Request, Response} from 'express';
import { login } from '../login/login.js';
import { errorMessage } from '../functions/errorMessageCheck.js';
import * as express from 'express';
import jwt from 'jsonwebtoken';
import passport from "passport";

const router = express.Router();

// router.post('/login', async (req: Request, res: Response) => {
//   const resBody = await login(req);
//
//   errorMessage(res, resBody, 406);
//
//   res.end(JSON.stringify(resBody));
// });

router.post('/signup', passport.authenticate('signup', {session: false}), async (req: Request, res: Response) => {
  res.end(JSON.stringify({
    message: 'Успешная регистрация',
    user: req.user
  }))
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res.status(400);
        res.send(JSON.stringify({
          errorMessage: info.message
        }))
        return;
      }
      req.login(user, {session: false}, async (err) => {
        if (err) return next(err);

        const body = { _id: user._id, email: user.email};
        const token = jwt.sign({ user: body}, 'TOP_SECRET');

        return res.end(JSON.stringify({ token }));
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
});

export default router;
