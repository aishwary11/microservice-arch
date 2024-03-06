import { NextFunction, Request, Response } from 'express';
import path from 'path';

type RequestWithFiles = Request & {
  files: any;
};

const fileExtLimiter = (allowedExtArray: string[]) => (req: RequestWithFiles, res: Response, next: NextFunction) => {
  const files = req.files;
  const fileExtensions = Object.keys(files).map(key => path.extname(files[key].name));
  const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext));
  if (!allowed) {
    const message = `Upload failed. Only ${allowedExtArray.join(', ')} files allowed.`;
    return res.status(422).json({ status: 'error', message });
  }
  next();
};

export default fileExtLimiter;
