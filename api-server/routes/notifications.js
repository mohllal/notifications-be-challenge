import express from 'express';

import NotificationsValidationSchemas from '../validations/notifications';
import NotificationsController from '../controllers/notifications';
import RequestValidator from '../common/middlewares/requestValidator';

import {
  NOTIFICATIONS__CREATE_NOTIFICATION,
  NOTIFICATIONS__GET_NOTIFICATION,
  NOTIFICATIONS__RESEND_NOTIFICATION,
} from '../common/constants';

const router = express.Router();

/*
 * ****************************** Users APIs *******************************
 */

router.post(
  '/',
  RequestValidator.validate(NotificationsValidationSchemas[NOTIFICATIONS__CREATE_NOTIFICATION]),
  NotificationsController[NOTIFICATIONS__CREATE_NOTIFICATION],
);

router.get(
  '/:id',
  RequestValidator.validate(NotificationsValidationSchemas[NOTIFICATIONS__GET_NOTIFICATION]),
  NotificationsController[NOTIFICATIONS__GET_NOTIFICATION],
);

router.post(
  '/:id/resend',
  RequestValidator.validate(NotificationsValidationSchemas[NOTIFICATIONS__RESEND_NOTIFICATION]),
  NotificationsController[NOTIFICATIONS__RESEND_NOTIFICATION],
);

export default router;
