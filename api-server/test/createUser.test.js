import { expect } from 'chai';
import request from 'supertest';
import {
  CONFLICT,
  CREATED,
} from 'http-status';

import Dropper from './utils/dropper';
import UsersFactory from './factory/users';
import UsersModel from '../models/users';
import app from '../main';

describe('create user', () => {
  before(async () => {
    await Dropper.dropUsers();
  });
  it('should create user successfully and return 201 status code', async () => {
    const body = UsersFactory.generate();

    const response = await request(app)
      .post('/users')
      .send(body)
      .set('Accept', 'application/json')
      .expect(CREATED);

    const { _id } = response.body.data;
    const user = await UsersModel.findOne({ _id });

    expect(user).to.not.be.null;
    expect(user._id).to.equal(_id);
    expect(user.email).to.equal(body.email);
    expect(user.phone).to.equal(body.phone);
  });

  it('should not create user with the an existing email or phone and return 409 status code', async () => {
    const body = UsersFactory.generate();
    await UsersModel.create({
      email: body.email,
      phone: body.phone,
      name: body.name,
      language: body.language,
      nfTags: body.nfTags,
    });

    await request(app)
      .post('/users')
      .send(body)
      .set('Accept', 'application/json')
      .expect(CONFLICT);
  });
});
