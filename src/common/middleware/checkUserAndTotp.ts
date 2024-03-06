import { NextFunction, Request, Response } from 'express';
import db from '../utils/db';
import bcrypt from 'bcrypt';
import { errorResp } from '../utils/responsehelper';
import speakeasy from 'speakeasy';

const checkUserAndTotp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, totp } = req.body;
    const userDetails = await db('users').where('email', '=', email).select('*');
    if (!userDetails.length) return errorResp(res, 401, "Email doesn't exists");
    const isLogin = await bcrypt.compare(password, userDetails[0].password);
    if (!isLogin) return errorResp(res, 401, 'An error occurred during the login process');
    const isTotpValid = speakeasy.totp.verify({ secret: userDetails[0].totp, encoding: 'base32', token: totp });
    if (!isTotpValid) return errorResp(res, 401, 'Otp is not valid');
    next();
  } catch (error) {
    return errorResp(res, 403, 'Something went wrong');
  }
};

export default checkUserAndTotp;
