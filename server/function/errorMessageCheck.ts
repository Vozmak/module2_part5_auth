import { Response } from 'express';
import { logger } from '../logger/logger';

export function errorMessage(res: Response, body: any, code: number): void {
  if ('errorMessage' in body && body.errorMessage) {
    res.writeHead(code);
  }
  logger(JSON.stringify(body));
}
