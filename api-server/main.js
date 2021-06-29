import express from 'express';
import path from 'path';
import cors from 'cors';
import requestIp from 'request-ip';
import swaggerUi from 'swagger-ui-express';

import './lib/mongoose';
import { port } from './common/config';
import ErrorHandler from './common/middlewares/errorHandler';
import Logger from './lib/winston';
import SwaggerDocs from './docs';

import HealthCheckRouter from './routes/healthcheck';
import UsersRouter from './routes/users';

const logger = new Logger(module);
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true, credentials: true }));
app.use(requestIp.mw());
app.use(express.json({ limit: '100mb' }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocs));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(logger.expressWinstonMiddleware);

app.get('/', (req, res) => res.render('index'));

app.use('/healthcheck', HealthCheckRouter);
app.use('/users', UsersRouter);

app.use(logger.expressWinstonErrorMiddleware);
app.use(ErrorHandler.handle());

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

export default app;
