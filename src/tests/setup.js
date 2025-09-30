import mongoose from 'mongoose';
import { expect } from 'chai';
import app from '../app.js'; // Adjust the import based on your app's structure

before(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.TEST_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async () => {
  // Disconnect from the database after tests
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});