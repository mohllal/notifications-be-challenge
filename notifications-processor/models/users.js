import '../lib/mongoose';

import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import {
  SUPPORTED_LANGUAGES_ISO_CODES,
} from '../common/constants';

const UsersSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
    enum: SUPPORTED_LANGUAGES_ISO_CODES,
  },
  nfToken: {
    type: String,
    default: () => nanoid(),
    required: true,
    unique: true,
  },
  nfTags: {
    type: [String],
    required: false,
  },
}, { collection: 'users', timestamps: true });

const Users = mongoose.model('users', UsersSchema);

export default Users;
