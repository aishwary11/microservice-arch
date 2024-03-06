export default class ErrorExtended extends Error {
  statusCode: number;
  code: string;
  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

// class ExtendedErrorHandler extends ErrorHandler {
//   code: number;
//   keyValue: { [key: string]: any };
//   path: string;
//   constructor(message: string, statusCode: number, code: number, keyValue: { [key: string]: any }, path: string) {
//     super(message, statusCode);
//     this.code = code;
//     this.keyValue = keyValue;
//     this.path = path;
//   }
// }

// export default (err: ErrorHandler | ExtendedErrorHandler, req: Request, res: Response, next: NextFunction) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || 'Internal Server Error';
//   if (err instanceof ExtendedErrorHandler && err.name === 'CastError') {
//     const message = `Resource not found. Invalid: ${err.path}`;
//     err = new ErrorHandler(message, 400);
//   }
//   if (err instanceof ExtendedErrorHandler && err.code === 11000) {
//     const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
//     err = new ErrorHandler(message, 400);
//   }
//   if (err.name === 'JsonWebTokenError') {
//     const message = `Json Web Token is invalid, Try again `;
//     err = new ErrorHandler(message, 400);
//   }
//   if (err.name === 'TokenExpiredError') {
//     const message = `Json Web Token is Expired, Try again `;
//     err = new ErrorHandler(message, 400);
//   }
//   errorResp(res, err.statusCode, err.message);
// };
