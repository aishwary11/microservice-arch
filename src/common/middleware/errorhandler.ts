import { NextFunction, Request, Response } from 'express';
import { errorResp } from '../utils/responsehelper';
import ErrorExtended from './error';

const errorHandler = (err: ErrorExtended, req: Request, res: Response, next: NextFunction) => {
  if (err) return errorResp(res, err.statusCode || 500, err.message);
  next();
};
export default errorHandler;
