import {Request, Response} from 'express';
import {login} from '../login/login.js';
import {errorMessage} from '../functions/errorMessageCheck.js';
import * as express from 'express';
import passport from "passport";

const router = express.Router();

router.post('/signup', passport.authenticate('signup', {session: false}), async (req: Request, res: Response) => {
    // const resBody = await login(req);

    res.end(JSON.stringify({
        message: 'Успешная регистрация',
        user: req.user
    }));
});

export default router