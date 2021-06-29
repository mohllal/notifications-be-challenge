import express from 'express';

import UsersValidationSchemas from '../validations/users';
import UsersController from '../controllers/users';
import RequestValidator from '../common/middlewares/requestValidator';

import {
  USERS__CREATE_USER,
  USERS__GET_USER,
  USERS__UPDATE_USER,
} from '../common/constants';

const router = express.Router();

/*
 * ****************************** Users APIs *******************************
 */

router.post(
  '/',
  RequestValidator.validate(UsersValidationSchemas[USERS__CREATE_USER]),
  UsersController[USERS__CREATE_USER],
);

router.get(
  '/:id',
  RequestValidator.validate(UsersValidationSchemas[USERS__GET_USER]),
  UsersController[USERS__GET_USER],
);

router.put(
  '/:id',
  RequestValidator.validate(UsersValidationSchemas[USERS__UPDATE_USER]),
  UsersController[USERS__UPDATE_USER],
);

export default router;
