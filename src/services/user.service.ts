import bcrypt from 'bcrypt';
import { Request } from 'express';
import constant from '../common/constants';
import { convertDate } from '../common/utils/commonutils';
import db from '../common/utils/db';

export const userCreate = async (req: Request) => {
  const { name, email, dob, password } = await req.body;
  const hashPassword = await bcrypt.hash(password, constant.saltRound);
  return await db('users').insert({ name, email, dob: convertDate(dob), password: hashPassword });
};
