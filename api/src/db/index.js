/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from './config/mongo';

export default {
  start: () => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);

    try {
      mongoose.connect(config.MONGO_URL);
    } catch (err) {
      mongoose.createConnection(config.MONGO_URL);
    }

    mongoose.connection.once('open', () => console.log('Connected to MongoDB')).on('error', (e) => {
      throw e;
    });
  },
};
