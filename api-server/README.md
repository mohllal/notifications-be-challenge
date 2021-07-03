# API Server

A Node.js/Express.js server which handles the users and notifications basic CRUD operations.

## Getting Started

### Requirements

- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/community-edition)

### Libraries

The following libraries are used in this project

- Web Server: [express.js](https://expressjs.com/) with [swagger](https://swagger.io/) and [Joi](https://joi.dev/) data validator.
- Logging: [winston](https://github.com/winstonjs/winston)
- Testing: [mocha](https://mochajs.org/) with [chai](http://chaijs.com/) for [BDD](https://www.agilealliance.org/glossary/bdd).
- Linting: [eslint](http://eslint.org/)
- Deployment: [Docker](https://www.docker.com/community-edition)

### Available build scripts

The available scripts are in the `package.json` file

- `npm start` - start the application.
- `npm run dev` - start the application in development mode, e.g. application reloads each time a change is made.
- `npm test` -  run the unit tests, the results are printed to the console.
- `npm run lint` -  run linting of the application code.

### Docker

This service can be built as a Docker container. See the [`Dockerfile`](./Dockerfile)

1. Build the Docker image
```shell
docker build -t api-server .
```

2. Run the Docker container
```shell
docker run -p 3000:3000 api-server
```

### Resources

- [Postman Documentation](https://documenter.getpostman.com/view/2472569/TzkzrzkQ)

## Models

### User

| Key      | Type   | Description                                              |
|:--------:|:------:|:--------------------------------------------------------:|
| _id      | String | Unique identifier                                        |
| email    | String | Email address                                            |
| phone    | String | Phone number                                             |
| language | String | Preferred language. Its values should be one of [ar, en] |
| nfToken  | String | Push notification device token                           |
| nfTags   | String | Tag used for the GROUP notification type                 |

### Notification

| Key      | Type   | Description                                                                    |
|:--------:|:------:|:------------------------------------------------------------------------------:|
| _id      | String | Notification unique identifier.                                                |
| type     | String | Notification type. Its value should be one of [GROUP, PERSONALIZED].           |
| provider | String | Notification provider. Its value should be one of [PUSH, SMS].                 |
| message  | Object | Notification message object holding the different message locales.             |
| status   | Object | Notification status object holding the current status and statuses timestamps. |
| tag      | String | Notification tag used for the group type.                                      |
| userId   | String | User id used for the personalized type.                                        |

## Flows

### Personalized SMS/Push

1. Create a user through the `POST /users` API with the below payload
```json
{
    "email": "kareem.mohllal@gmail.com",
    "phone": "+201092574326",
    "name": "Kareem Khaled",
    "language": "ar"
}
```
2. Create a personalized notification through the `POST /notification` API with the below payload
```json
{
    "type": "PERSONALIZED",
    "provider": "PUSH",
    "message": {
        "ar": "اهلا بك",
        "en": "Hi user!"
    },
    "userId": "uZz58DMACOLuF12NepQ5h"
}
```

### Grouped SMS/Push

1. Create user through the `POST /users` API with the below payload
```json
{
    "email": "kareem.mohllal@gmail.com",
    "phone": "+201092574326",
    "name": "Kareem Khaled",
    "language": "ar",
    "nfTags": ["promo50X"]
}
```
2. Create a grouped notification through the `POST /notification` API with the below payload
```json
{
    "type": "GROUP",
    "provider": "PUSH",
    "message": {
        "ar": "اهلا بك",
        "en": "Hi user!"
    },
    "tag": "promo50X"
}
```
