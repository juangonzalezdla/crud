import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.connect(url).then(() => {
    console.log('Database connected');
  });
}

export default connectDB;