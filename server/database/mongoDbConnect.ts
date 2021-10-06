import mongoose from 'mongoose';
import config from 'config'

const url: string = config.get('connectDb');

const connectDb = async () => {
  await mongoose.connect(url);
};

export { connectDb };
