# Notifications Forwarder

A Node.js rate-limited server which handles the personalized SMS and Push notifications types by integrating with other providers.

## Getting Started

### Requirements

- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/community-edition)

### Libraries

The following libraries are used in this project

- Queuing: [bullmq](https://docs.bullmq.io/)
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
docker build -t notifications-forwarder .
```

2. Run the Docker container
```shell
docker run notifications-forwarder
```

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
