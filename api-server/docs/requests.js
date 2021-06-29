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

export default class Requests {
  static getRequests() {
    return {
      CreateUserRequest,
      UpdateUserRequest,
    };
  }
}
