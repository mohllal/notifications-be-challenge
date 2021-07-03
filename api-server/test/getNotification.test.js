import { expect } from 'chai';
import request from 'supertest';
import {
  NOT_FOUND,
  OK,
} from 'http-status';

import Dropper from './utils/dropper';
import NotificationsFactory from './factory/notifications';
import {
  CREATED_NOTIFICATION_STATUS,
} from '../common/constants';
import NotificationsModel from '../models/notifications';
import app from '../main';

describe('get notification details', () => {
  before(async () => {
    await Dropper.dropNotifications();
  });
  it('should get notification details for an existing id and return 200 status code', async () => {
    const data = NotificationsFactory.generateGroupNotification();
    const notification = await NotificationsModel.create({
      type: data.type,
      provider: data.provider,
      message: data.message,
      tag: data.tag,
      status: {
        current: CREATED_NOTIFICATION_STATUS,
        createdAt: new Date(),
      },
    });

    const response = await request(app)
      .get(`/notifications/${notification._id}`)
      .set('Accept', 'application/json')
      .expect(OK);

    const { _id, type, provider } = response.body.data;

    expect(notification._id).to.equal(_id);
    expect(notification.type).to.equal(type);
    expect(notification.provider).to.equal(provider);
  });

  it('should not get notification details for a non-existing id return 404 status code', async () => {
    await request(app)
      .get('/notifications/rt2BTcw1')
      .set('Accept', 'application/json')
      .expect(NOT_FOUND);
  });
});
