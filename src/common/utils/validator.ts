import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { errorResp } from './responsehelper';

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  dob: z.string().refine(
    value => {
      const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
      return dateRegex.test(value);
    },
    {
      message: 'Date must be in DD-MM-YYYY format',
    },
  ),
});

export const validateUserBody = (req: Request, res: Response, next: NextFunction) => {
  const result = userSchema.safeParse(req.body);
  return result.success ? next() : errorResp(res, 400, result.error.message);
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  totp: z.string(),
});

export const validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const result = loginSchema.safeParse(req.body);
  return result.success ? next() : errorResp(res, 400, result.error.message);
};
