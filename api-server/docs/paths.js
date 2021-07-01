/*
* ****************************** User Path *******************************
*/

const UserPath = {
  '/users': {
    post: {
      tags: [
        'Users',
      ],
      summary: 'Create new user',
      requestBody: {
        $ref: '#/components/requestBodies/CreateUserRequest',
      },
      responses: {
        200: {
          $ref: '#/components/responses/UserResponse',
        },
        400: {
          $ref: '#/components/responses/BadRequestErrorResponse',
        },
        500: {
          $ref: '#/components/responses/InternalServerErrorResponse',
        },
      },
      'x-codegen-request-body-name': 'body',
    },
  },
  '/users/{id}': {
    get: {
      tags: [
        'Users',
      ],
      summary: 'Get user info',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The user id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          $ref: '#/components/responses/UserResponse',
        },
        400: {
          $ref: '#/components/responses/BadRequestErrorResponse',
        },
        500: {
          $ref: '#/components/responses/InternalServerErrorResponse',
        },
      },
    },
    put: {
      tags: [
        'Users',
      ],
      summary: 'Update user info',
      requestBody: {
        $ref: '#/components/requestBodies/UpdateUserRequest',
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The user id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          $ref: '#/components/responses/UserResponse',
        },
        400: {
          $ref: '#/components/responses/BadRequestErrorResponse',
        },
        500: {
          $ref: '#/components/responses/InternalServerErrorResponse',
        },
      },
      'x-codegen-request-body-name': 'body',
    },
  },
  '/notifications': {
    post: {
      tags: [
        'Notifications',
      ],
      summary: 'Create new notification',
      requestBody: {
        $ref: '#/components/requestBodies/CreateNotificationRequest',
      },
      responses: {
        200: {
          $ref: '#/components/responses/NotificationResponse',
        },
        400: {
          $ref: '#/components/responses/BadRequestErrorResponse',
        },
        500: {
          $ref: '#/components/responses/InternalServerErrorResponse',
        },
      },
      'x-codegen-request-body-name': 'body',
    },
  },
  '/notifications/{id}': {
    get: {
      tags: [
        'Notifications',
      ],
      summary: 'Get notification info',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The notification id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          $ref: '#/components/responses/NotificationResponse',
        },
        400: {
          $ref: '#/components/responses/BadRequestErrorResponse',
        },
        500: {
          $ref: '#/components/responses/InternalServerErrorResponse',
        },
      },
    },
  },
  '/notifications/{id}/resend': {
    post: {
      tags: [
        'Notifications',
      ],
      summary: 'Resend notification',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The notification id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          $ref: '#/components/responses/NotificationResponse',
        },
        400: {
          $ref: '#/components/responses/BadRequestErrorResponse',
        },
        500: {
          $ref: '#/components/responses/InternalServerErrorResponse',
        },
      },
    },
  },
};

/*
* ****************************** Healthcheck Path *******************************
*/

const HealthcheckPath = {
  '/healthcheck': {
    get: {
      tags: [
        'Healthcheck',
      ],
      summary: 'Get healthcheck info',
      responses: {
        200: {
          $ref: '#/components/responses/HealthcheckResponse',
        },
        400: {
          $ref: '#/components/responses/BadRequestErrorResponse',
        },
        500: {
          $ref: '#/components/responses/InternalServerErrorResponse',
        },
      },
    },
  },
};

export default class Paths {
  static getPaths() {
    return {
      ...UserPath,
      ...HealthcheckPath,
    };
  }
}
