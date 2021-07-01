import {
  NOTIFICATIONS_TYPES,
  NOTIFICATIONS_PROVIDERS,
  SMS_NOTIFICATION_PROVIDER,
  PERSONALIZED_NOTIFICATION_TYPE,
} from '../common/constants';
import Utils from '../common/utils';

/*
* ****************************** User Requests *******************************
*/

const CreateUserRequest = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['name', 'email', 'phone', 'language'],
        properties: {
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
            example: 'ar',
            description: 'The user preferred language',
          },
          nfTags: {
            type: 'array',
            items: {
              type: 'string',
              example: 'Rh5xvLbHKN',
              description: 'The user notification assigned tags',
            },
          },
        },
      },
    },
  },
};

const UpdateUserRequest = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
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
            example: 'ar',
            description: 'The user preferred language',
          },
          nfTags: {
            type: 'array',
            items: {
              type: 'string',
              example: 'Rh5xvLbHKN',
              description: 'The user notification assigned tags',
            },
          },
        },
      },
    },
  },
};

/*
* ****************************** Notification Requests *******************************
*/

const CreateNotificationRequest = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['type', 'provider', 'message'],
        properties: {
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
        },
      },
    },
  },
};

export default class Requests {
  static getRequests() {
    return {
      CreateUserRequest,
      UpdateUserRequest,
      CreateNotificationRequest,
    };
  }
}
