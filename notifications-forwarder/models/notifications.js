import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import {
  NOTIFICATIONS_TYPES,
  NOTIFICATIONS_PROVIDERS,
  NOTIFICATIONS_STATUSES,
  CREATED_NOTIFICATION_STATUS,
} from '../common/constants';
import Utils from '../common/utils';

const NotificationStatusSchema = new mongoose.Schema({
  current: {
    type: String,
    required: true,
    enum: NOTIFICATIONS_STATUSES,
    default: CREATED_NOTIFICATION_STATUS,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  enqueuedAt: {
    type: Date,
    required: false,
  },
  processedAt: {
    type: Date,
    required: false,
  },
  deliveredAt: {
    type: Date,
    required: false,
  },
  failedAt: {
    type: Date,
    required: false,
  },
}, { _id: false });

const NotificationMessageSchema = new mongoose.Schema({
  ...Utils.covertSupportedLanguageIsoCodesIntoMongooseObj(),
}, { _id: false });

const NotificationsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: NOTIFICATIONS_TYPES,
  },
  provider: {
    type: String,
    required: true,
    enum: NOTIFICATIONS_PROVIDERS,
  },
  message: {
    type: NotificationMessageSchema,
    required: true,
  },
  status: {
    type: NotificationStatusSchema,
    required: true,
  },
  tag: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
}, { collection: 'notifications', timestamps: true });

const Notifications = mongoose.model('notifications', NotificationsSchema);

export default Notifications;
