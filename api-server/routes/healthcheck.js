import express from 'express';

import {
  HEALTHCHECK__GET_HEALTHCHECK,
} from '../common/constants';
import HealthcheckController from '../controllers/healthcheck';

const router = express.Router();

/*
 * ****************************** Healthcheck APIs *******************************
 */

router.get(
  '/',
  HealthcheckController[HEALTHCHECK__GET_HEALTHCHECK],
);

export default router;
