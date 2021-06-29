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
      example: 'ar',
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
      Healthcheck,
    };
  }
}
