import _ from 'lodash';
import {
  BAD_REQUEST,
} from 'http-status';

export default class RequestValidator {
  static validate(schema) {
    return async (req, res, next) => {
      const options = {
        abortEarly: true,
        allowUnknown: false,
        stripUnknown: false,
      };

      if (schema && !_.isEmpty(schema)) {
        const validations = ['headers', 'params', 'query', 'body'].map(
          (key) => {
            const sc = schema[key];
            const value = req[key];

            return sc ? sc.validateAsync(value, options) : Promise.resolve();
          },
        );

        try {
          await Promise.all(validations);
          return next();
        } catch (error) {
          const message = error.details[0].message.replace(/['"]/g, '');
          return res.status(BAD_REQUEST).json({
            success: false,
            message,
          });
        }
      } else {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: 'Empty validation schema provided!',
        });
      }
    };
  }
}
