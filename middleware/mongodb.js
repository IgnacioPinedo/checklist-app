import mongoose from 'mongoose';

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  const DB = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/ChecklistAppDB?retryWrites=true&w=majority`;

  mongoose.set('strictQuery', true);

  await mongoose.connect(DB);

  return handler(req, res);
};

export default connectDB;