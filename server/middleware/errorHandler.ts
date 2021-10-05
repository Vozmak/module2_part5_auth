import {NextFunction, Request, Response} from "express";
import {logger} from "../logger/logger.js";

async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    logger(`Ошибка на сервере: ${err.message}`);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500)
    res.json({ errorMessage: 'Ошибка на стороне сервера' });
}

export {errorHandler}