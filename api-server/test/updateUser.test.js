import { expect } from 'chai';
import request from 'supertest';
import {
  OK,
} from 'http-status';

import Dropper from './utils/dropper';
import UsersFactory from './factory/users';
import UsersModel from '../models/users';
import app from '../main';

describe('update user', () => {
  before(async () => {
    await Dropper.dropUsers();
  });
  it('should update user successfully and return 200 status code', async () => {
    const body = UsersFactory.generate();
    const user = await UsersModel.create({
      email: body.email,
      phone: body.phone,
      name: body.name,
      language: body.language,
      nfTags: [],
    });

    await request(app)
      .put(`/users/${user._id}`)
      .send(body)
      .set('Accept', 'application/json')
      .expect(OK);

    const updatedUser = await UsersModel.findOne({ _id: user._id });

    expect(updatedUser).to.not.be.null;
    expect(updatedUser.nfTags).to.deep.equal(body.nfTags);
  });
});
