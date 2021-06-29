import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const environment = process.env.NODE_ENV || 'development';
export const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
export const mongodb = {
  uri:
    process.env.MONGODB_URI
    || 'mongodb://localhost:27017/notification-be',
};

const config = {
  environment,
  port,
  mongodb,
};

export default config;
