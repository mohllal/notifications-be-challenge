import {
  ARABIC_LANGUAGE_ISO_CODE,
  SUPPORTED_LANGUAGES_ISO_CODES,
  NOTIFICATIONS_TYPES,
  NOTIFICATIONS_PROVIDERS,
  NOTIFICATIONS_STATUSES,
  SMS_NOTIFICATION_PROVIDER,
  PERSONALIZED_NOTIFICATION_TYPE,
  ENQUEUED_NOTIFICATION_STATUS,
} from '../common/constants';
import Utils from '../common/utils';

/*
* ****************************** User Schema *******************************
*/

const User = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 'Mni2moonMkNVd93CdV',
      description: 'The user id',
    },
    name: {
      type: 'string',
      example: 'Kareem Khaled',
      description: 'The user name',
    },
    email: {
      type: 'string',
      example: 'kareem.mohllal@gmail.com',
      description: 'The user email address',
    },
    phone: {
      type: 'string',
      example: '01092574326',
      description: 'The user phone number',
    },
    language: {
      type: 'string',
      example: ARABIC_LANGUAGE_ISO_CODE,
      enum: SUPPORTED_LANGUAGES_ISO_CODES,
      description: 'The user preferred language',
    },
    nfToken: {
      type: 'string',
      example: 'OlWqeLFUH18qOYM3t2V8xKZfzNdH1V3KZixbJwpDbKQqToKiQQ',
      description: 'The user notification device token',
    },
    nfTags: {
      type: 'array',
      items: {
        type: 'string',
        example: 'Rh5xvLbHKN',
        description: 'The user notification assigned tags',
      },
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: new Date(),
      description: 'The user creation timestamp',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: new Date(),
      description: 'The user last update timestamp',
    },
  },
};

/*
* ****************************** Notification Schema *******************************
*/

const Notification = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 'Rs5b0uWChXG3dLuqK3dPN',
      description: 'The notification id',
    },
    type: {
      type: 'string',
      enum: NOTIFICATIONS_TYPES,
      example: PERSONALIZED_NOTIFICATION_TYPE,
      description: 'The notification type',
    },
    provider: {
      type: 'string',
      enum: NOTIFICATIONS_PROVIDERS,
      example: SMS_NOTIFICATION_PROVIDER,
      description: 'The notification provider',
    },
    message: {
      type: 'object',
      properties: {
        ...Utils.covertSupportedLanguageIsoCodesIntoSwaggerObj(),
      },
    },
    status: {
      type: 'object',
      properties: {
        current: {
          type: 'string',
          enum: NOTIFICATIONS_STATUSES,
          example: ENQUEUED_NOTIFICATION_STATUS,
          description: 'The notification current status',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: new Date(),
          description: 'The notification creation timestamp',
        },
        enqueuedAt: {
          type: 'string',
          format: 'date-time',
          example: new Date(),
          description: 'The notification enqueuing timestamp',
        },
        processedAt: {
          type: 'string',
          format: 'date-time',
          example: new Date(),
          description: 'The notification processing timestamp',
        },
        deliveredAt: {
          type: 'string',
          format: 'date-time',
          example: new Date(),
          description: 'The notification delivering timestamp',
        },
        failedAt: {
          type: 'string',
          format: 'date-time',
          example: new Date(),
          description: 'The notification failing timestamp',
        },
      },
    },
    tag: {
      type: 'string',
      example: 'itfWP5qs',
      description: 'The notification tag which can placed on users nfTags (grouped notification)',
    },
    userId: {
      type: 'string',
      example: 'CY-39iitfWP5qs3m333tg',
      description: 'The notification user id which will be notified (personalized notification)',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: new Date(),
      description: 'The notification creation timestamp',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: new Date(),
      description: 'The notification last update timestamp',
    },
  },
};

/*
* ****************************** Healthcheck Schema *******************************
*/

const Healthcheck = {
  type: 'object',
  properties: {
    time: {
      type: 'string',
      format: 'date-time',
      example: new Date(),
      description: 'The current timestamp',
    },
    up: {
      type: 'string',
      format: 'date-time',
      example: new Date(),
      description: 'The uptime interval',
    },
  },
};

export default class Schemas {
  static getSchemas() {
    return {
      User,
      Notification,
      Healthcheck,
    };
  }
}
