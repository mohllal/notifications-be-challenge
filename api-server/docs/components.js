import Requests from './requests';
import Responses from './responses';
import Schemas from './schemas';

export default class Components {
  static getComponents() {
    return {
      schemas: {
        ...Schemas.getSchemas(),
      },
      requestBodies: {
        ...Requests.getRequests(),
      },
      responses: {
        ...Responses.getResponses(),
      },
    };
  }
}
