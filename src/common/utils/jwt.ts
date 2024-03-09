import jwt, { JwtPayload } from 'jsonwebtoken';
import constant from '../constants';
const secretKey = process.env.SECRET_KEY!;
export const generateJWT = (payload: any): string => jwt.sign(payload, secretKey, { expiresIn: constant.jwtExpire });
export const verifyJWT = (token: string = ''): Promise<string | JwtPayload> => jwt.verify(token, secretKey) as Promise<string | JwtPayload>;
