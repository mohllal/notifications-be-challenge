import path from 'path';
import * as admin from 'firebase-admin';

import {
  fcmServiceAccountPath,
  fcmServiceApplicationName,
} from '../common/config';
import Logger from './winston';

const logger = new Logger(module);

class FCM {
  constructor() {
    this.applicationName = fcmServiceApplicationName;
    this.serviceAccountFile = path.join(__dirname, fcmServiceAccountPath);
    this.messaging = admin.initializeApp(
      {
        credential: admin.credential.cert(this.serviceAccountFile),
        databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
      },
      this.applicationName,
    );
  }

  async sendNotification(message, token) {
    try {
      logger.info(`Sending push notification with message: ${message} to token: ${token} using FCM provider`);
      const fcmMessage = {
        android: {
          ttl: 86400,
          priority: 'high',
        },
        webpush: {
          headers: {
            TTL: '86400',
          },
        },
        notification: {
          body: message,
        },
        token,
      };

      return await this.messaging.send(fcmMessage);
    } catch (error) {
      logger.error(`Error in FCM send service: ${error.message}`);
      throw error;
    }
  }
}

export default FCM;
