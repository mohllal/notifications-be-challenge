import Paths from './paths';
import Components from './components';

export default {
  openapi: '3.0.3',
  info: {
    version: '1.0.0',
    title: 'API Server',
    description: 'Restful APIs for the users and notifications modules',
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local Server',
    },
  ],
  tags: [
    {
      name: 'Users',
      description: 'Everything about the users module',
    },
    {
      name: 'Healthcheck',
      description: 'Everything about the healthcheck module',
    },
  ],
  components: Components.getComponents(),
  paths: Paths.getPaths(),
};
