import {NextFunction, Request, Response} from "express";
import pkg from 'simple-node-logger';
import {Logger} from "simple-node-logger";

const { createRollingFileLogger } = pkg;

let logInfo: Logger = createRollingFileLogger({
    errorEventName: 'error',
    logDirectory: 'server/logger',
    fileNamePattern: 'logFile-<DATE>.log',
    dateFormat: 'DD-MM-YYYY HH',
    timestampFormat: 'DD-MM-YYYY HH:mm:ss.SSS'
});

export function logger(message: string): void;
export function logger(req: Request, res?: Response, next?: NextFunction): void;
export function logger(reqOrMsg: Request | string, res?: Response, next?: NextFunction): void {
    if (typeof reqOrMsg === 'string') {
        logInfo.info(`Ответ сервера: ${reqOrMsg}`);
    } else {
        logInfo.info(`Запрос на сервер: Method - ${reqOrMsg.method}; 
        URL - ${reqOrMsg.url}; 
        Body - ${JSON.stringify(reqOrMsg.body)}; 
        Headers - ${JSON.stringify(reqOrMsg.headers)}`);
    }

    if (next) {
        next();
    }
}
