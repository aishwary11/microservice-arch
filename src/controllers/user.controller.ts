import { Request, Response } from 'express';
import qrcode from 'qrcode';
import { totpSecret } from '../common/utils/commonutils';
import db from '../common/utils/db';
import { generateJWT } from '../common/utils/jwt';
import { errorResp, successResp } from '../common/utils/responsehelper';
import { userCreate } from '../services/user.service';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    return successResp(res, 200, 'User Login', { token: generateJWT({ name, email }) });
  } catch (error) {
    console.error('Error::', error);
    return errorResp(res, 400, 'An error occurred during the login process');
  }
};
export const createUser = async (req: Request, res: Response) => {
  try {
    const saveUser = await userCreate(req);
    if (!saveUser) return errorResp(res, 400, 'User already register');
    return successResp(res, 200, 'User saved successfully');
  } catch (error: any) {
    return error.code === 'ER_DUP_ENTRY' ? errorResp(res, 400, 'Duplicate entry') : errorResp(res, 500, 'Something Went Wrong');
  }
};

export const generateTOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!totpSecret.otpauth_url) return errorResp(res, 400, 'TOTP Secret is not properly configured.');
    qrcode.toDataURL(
      totpSecret.otpauth_url,
      {
        color: {
          dark: '#ededed',
          light: '#5b87b9',
        },
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        margin: 1,
        maskPattern: 4,
      },
      async (err, data_url) => {
        if (err) return errorResp(res, 400, 'Could not generate OTP. Please try again.');
        await db.raw("UPDATE users SET totp = ? WHERE email = ?", [totpSecret.base32, email]);
        return res.send(`<img src="${data_url}">`);
      },
    );
  } catch (error) {
    return errorResp(res, 400, 'Could not generate OTP. Please try again.');
  }
};

// export const generateOTP = async (req: Request, res: Response) => {
//   try {
//     const phoneNum = "+918591693650";
//     const otp = await sendOTP(phoneNum, 1111);
//     console.log("OTP ::", otp);
//     return successResp(res, 200, `OTP send to ${phoneNum}`);
//   } catch (error) {
//     return errorResp(res, 400, 'Could not generate OTP. Please try again.');
//   }
// };
