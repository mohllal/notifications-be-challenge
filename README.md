# Notifications BE Challenge

![ci](https://github.com/mohllal/notifications-be-challenge/actions/workflows/main.yml/badge.svg)

We communicate with our customers via different types of notifications (e.g we send promo codes to customers via SMS, send in-ride push notifications like “Your drop-off station is coming”). And each customer receives a notification in their preferred language.

The project is split into three services:

1. [RESTful API Server](./api-server/), a Node.js/Express.js server which handles the users and notifications basic CRUD operations.

2. [Notifications Forwarder](./notifications-forwarder/), a Node.js rate-limited server which handles the personalized SMS and Push notifications types by integrating with other providers.

3. [Notifications Processor](./notifications-processor/), a Node.js server which handles the grouped SMS and Push notifications types by disaggregating/converting them into personalized notifications to the [Notifications Forwarder](./notifications-forwarder/) server to handle.

## Specifications

- Notifications Types are as follows:
  - Group notifications which are sent as a text notification to a group of users.
  - Personalized notifications which are sent as a specific text notification to a specific user.
- Notification can be delivered by two types of providers:
  - SMS
  - Push notifications
- The number of requests that providers (SMS, Push notifications) can handle per
minute are limited.

## Docker Hub Images

- [RESTful API Server](https://hub.docker.com/repository/docker/mohllal/nf-be-challenge-api-server)
- [Notifications Forwarder](https://hub.docker.com/repository/docker/mohllal/nf-be-challenge-notifications-processor)
- [Notifications Processor](https://hub.docker.com/repository/docker/mohllal/nf-be-challenge-notifications-processor)

## Starting the services as Docker containers

- Navigate to the repository root directory and run a container for each service, using the command:

```shell
docker-compose up
```

- To see the list of running containers, run the command - `docker-compose ps`. You will see a list of container names, states, and ports listed.

- Go to the browser and run [http://localhost:3000/docs](http://localhost:3000/docs) to view the Swagger APIs documentation of the users and notifications modules.

- If you wish to stop the containers gracefully, use the below command:

```shell
docker-compose stop
# To remove (and stop) the container
docker-compose down
```

## Resources

- [Architecture Diagram](./architecture-diagram.pdf)
- [Postman Documentation](https://documenter.getpostman.com/view/2472569/TzkzrzkQ).

## Technologies

- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [GitHub Actions](https://github.com/features/actions)
- [Node.js](https://nodejs.org/)
- [Swagger](https://swagger.io/)
