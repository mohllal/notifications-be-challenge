import GroupDisaggregatedQueue from '../queues/groupDisaggregatedQueue';
import {
  groupDisaggregatedQueueName,
  personalizedPushNotificationQueueName,
} from '../common/config';
import Utils from '../common/utils';
import Logger from '../lib/winston';

const logger = new Logger(module);

export default class PushNotificationHandler {
  constructor() {
    this.queue = GroupDisaggregatedQueue;
  }

  async send(notificationId, notificationMessageObj, notificationTag) {
    const messages = await Utils.prepareGroupNotificationMessage(
      notificationMessageObj,
      notificationTag,
    );

    if (messages.length === 0) {
      return logger.info(`Skipping group push notification with tag ${notificationTag}: no users found with this tag.`);
    }

    logger.info(`Sending group push notification with tag ${notificationTag} to ${messages.length} user/s`);

    const children = messages.map((message) => ({
      name: notificationId,
      data: message,
      queueName: personalizedPushNotificationQueueName,
    }));

    return this.queue.add({
      name: notificationId,
      queueName: groupDisaggregatedQueueName,
      children,
    });
  }
}
