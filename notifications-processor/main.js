import './lib/mongoose';

import './events/groupDisaggregatedEvents';
import './events/groupPushNotificationEvents';
import './events/groupSmsNotificationEvents';

import GroupPushNotificationWorker from './workers/groupPushNotificationWorker';
import GroupSmsNotificationWorker from './workers/groupSmsNotificationWorker';

GroupPushNotificationWorker('../processors/groupPushNotificationProcessor');
GroupSmsNotificationWorker('../processors/groupSmsNotificationProcessor');
