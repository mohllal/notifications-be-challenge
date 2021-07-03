import { expect } from 'chai';
import request from 'supertest';
import {
  CREATED,
} from 'http-status';

import Dropper from './utils/dropper';
import NotificationsFactory from './factory/notifications';
import UsersFactory from './factory/users';
import NotificationsModel from '../models/notifications';
import UsersModel from '../models/users';
import app from '../main';

describe('create notification', () => {
  before(async () => {
    await Dropper.dropUsers();
    await Dropper.dropNotifications();
  });
  it('should create group notification successfully and return 201 status code', async () => {
    const body = NotificationsFactory.generateGroupNotification();

    const response = await request(app)
      .post('/notifications')
      .send(body)
      .set('Accept', 'application/json')
      .expect(CREATED);

    const { _id } = response.body.data;
    const notification = await NotificationsModel.findOne({ _id }, {}, { lean: true });

    expect(notification).to.not.be.null;
    expect(notification._id).to.equal(_id);
    expect(notification.type).to.equal(body.type);
    expect(notification.provider).to.equal(body.provider);
    expect(notification.message).to.eqls(body.message);
  });

  it('should create personalized notification successfully and return 201 status code', async () => {
    const data = UsersFactory.generate();
    const user = await UsersModel.create({
      email: data.email,
      phone: data.phone,
      name: data.name,
      language: data.language,
      nfTags: data.nfTags,
    });

    const body = NotificationsFactory.generatePersonalizedNotification(user._id);

    const response = await request(app)
      .post('/notifications')
      .send(body)
      .set('Accept', 'application/json')
      .expect(CREATED);

    const { _id } = response.body.data;
    const notification = await NotificationsModel.findOne({ _id }, {}, { lean: true });

    expect(notification).to.not.be.null;
    expect(notification._id).to.equal(_id);
    expect(notification.type).to.equal(body.type);
    expect(notification.provider).to.equal(body.provider);
    expect(notification.message).to.eqls(body.message);
  });
});
