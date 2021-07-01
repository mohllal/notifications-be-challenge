import './lib/mongoose';

import './events/personalizedPushNotificationEvents';
import './events/personalizedSmsNotificationEvents';

import PersonalizedPushNotificationWorker from './workers/personalizedPushNotificationWorker';
import PersonalizedSmsNotificationWorker from './workers/personalizedSmsNotificationWorker';

PersonalizedPushNotificationWorker('../processors/personalizedPushNotificationProcessor');
PersonalizedSmsNotificationWorker('../processors/personalizedSmsNotificationProcessor');
