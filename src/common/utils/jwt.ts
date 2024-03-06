import jwt, { JwtPayload } from 'jsonwebtoken';
import constant from '../constants';
const secretKey = process.env.SECRET_KEY || 'An%Dr3j66DC9A&N+m~L2_ga£s+4Ld<!!U02J1=nIs$~zw3DB:v';
export const generateJWT = (payload: any): string => jwt.sign(payload, secretKey, { expiresIn: constant.jwtExpire });
export const verifyJWT = (token: string = ''): Promise<string | JwtPayload> => jwt.verify(token, secretKey) as Promise<string | JwtPayload>;
