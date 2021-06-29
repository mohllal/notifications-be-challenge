import {
  INTERNAL_SERVER_ERROR,
} from 'http-status';

export default class ErrorHandler {
  static handle() {
    // eslint-disable-next-line no-unused-vars
    return (err, req, res, next) => {
      res.status(err.status || INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
        code: err.code,
      });
    };
  }
}
