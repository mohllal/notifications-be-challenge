import { expect } from 'chai';
import request from 'supertest';
import {
  NOT_FOUND,
  OK,
} from 'http-status';

import Dropper from './utils/dropper';
import UsersFactory from './factory/users';
import UsersModel from '../models/users';
import app from '../main';

describe('get user details', () => {
  before(async () => {
    await Dropper.dropUsers();
  });
  it('should get user details for an existing id and return 200 status code', async () => {
    const data = UsersFactory.generate();
    const user = await UsersModel.create({
      email: data.email,
      phone: data.phone,
      name: data.name,
      language: data.language,
      nfTags: data.nfTags,
    });

    const response = await request(app)
      .get(`/users/${user._id}`)
      .set('Accept', 'application/json')
      .expect(OK);

    const { _id, email, phone } = response.body.data;

    expect(user._id).to.equal(_id);
    expect(user.email).to.equal(email);
    expect(user.phone).to.equal(phone);
  });

  it('should not get user details for a non-existing id return 404 status code', async () => {
    await request(app)
      .get('/users/rt2BTcw1')
      .set('Accept', 'application/json')
      .expect(NOT_FOUND);
  });
});
