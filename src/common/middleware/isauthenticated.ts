import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/jwt';
import { errorResp } from '../utils/responsehelper';

type UserRequest = Request & {
  user?: any;
};
const isAuthenticated = async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    req.user = await verifyJWT(token);
    next();
  } catch (error) {
    return errorResp(res, 400, 'Token Invalid');
  }
};

export default isAuthenticated;
