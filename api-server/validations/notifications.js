import Joi from 'joi';
import {
  NOTIFICATIONS__CREATE_NOTIFICATION,
  NOTIFICATIONS__GET_NOTIFICATION,
  NOTIFICATIONS__RESEND_NOTIFICATION,
  NOTIFICATIONS_TYPES,
  NOTIFICATIONS_PROVIDERS,
  PERSONALIZED_NOTIFICATION_TYPE,
  GROUP_NOTIFICATION_TYPE,
} from '../common/constants';
import Utils from '../common/utils';

export default class NotificationsValidationSchemas {
  static [NOTIFICATIONS__CREATE_NOTIFICATION] = {
    body: Joi.object()
      .keys({
        type: Joi.string().valid(...NOTIFICATIONS_TYPES).required(),
        provider: Joi.string().valid(...NOTIFICATIONS_PROVIDERS).required(),
        message: Joi.object()
          .keys({
            ...Utils.covertSupportedLanguageIsoCodesIntoJoiObj(),
          }).required(),
        tag: Joi.when('type', {
          is: GROUP_NOTIFICATION_TYPE,
          then: Joi.string().min(1).required(),
          otherwise: Joi.forbidden(),
        }),
        userId: Joi.when('type', {
          is: PERSONALIZED_NOTIFICATION_TYPE,
          then: Joi.string().min(1).required(),
          otherwise: Joi.forbidden(),
        }),
      })
      .required(),
  };

  static [NOTIFICATIONS__GET_NOTIFICATION] = {
    params: Joi.object()
      .keys({
        id: Joi.string().min(1).required(),
      })
      .required(),
  };

  static [NOTIFICATIONS__RESEND_NOTIFICATION] = {
    params: Joi.object()
      .keys({
        id: Joi.string().min(1).required(),
      })
      .required(),
  };
}
