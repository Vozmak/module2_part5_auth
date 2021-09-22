import {NextFunction, Request, Response} from "express";
import {logger} from "../logger/logger";

function authorizationChecker(req: Request, res: Response, next: NextFunction): void {
    if (/gallery/.test(req.url)) {
        if (!req.headers.authorization) {
            res.writeHead(401);
            res.end(JSON.stringify({
                errorMessage: 'No authorization',
            }));

            logger('No Authorization');
        } else {
            next();
        }
    } else {
        next();
    }
}

export {authorizationChecker}