import { Response } from 'express';
export const successResp = async (res: Response, status: number = 200, msg: string = '', data?: any) => res.status(status).json({ msg, data });
export const errorResp = async (res: Response, status: number = 400, err: string = '') => res.status(status).json({ err });
