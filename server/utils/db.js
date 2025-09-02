import mongoose from 'mongoose';

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {});
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;