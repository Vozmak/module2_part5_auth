import passport from 'passport';
import {Strategy} from 'passport-local'
import {Users} from "../database/Models/Users.js";
import JWTstrategy, {VerifiedCallback} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';


passport.use('signup', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email: string, password: string, done: Function) => {
    try {
        const userVerify = await Users.findOne({email});

        if (userVerify) {
            return done(null, false);
        }

        const user = await Users.create({email, password});
        return done(null, user);
    } catch (e) {
        done(e)
    }
}));

passport.use('login', new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email: string, password: string, done: Function) => {
    try {
        const user = await Users.findOne({email});

        if (!user) {
            return done(null, false, {message: 'Пользователь не найден'});
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
            return done(null, false, {message: 'Неверный пароль'});
        }

        return done(null, user, {message: 'Успешная авторизация'});
    } catch (e) {
        return done(e)
    }
}));

passport.use(new JWTstrategy.Strategy({
    secretOrKey: 'TOP_SECRET',
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
}, async (token, done: VerifiedCallback) => {
    try {
        return done(null, token.user);
    } catch (e) {
        return done(e);
    }
}))