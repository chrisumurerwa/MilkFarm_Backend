import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import router from './Routes/IndexRouting.js';
dotenv.config();
const port=process.env.PORT||3000
const db_user=process.env.DB_USER;
const db_name=process.env.DB_NAME;
const db_pass=process.env.DB_PASS;
const app=express();

app.use(express.json());
app.use('/',router);
const  dbUri=`mongodb+srv://${db_user}:${db_pass}@cluster0.uqqgv.mongodb.net/${db_name}`;
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000,  // Increase timeout
  socketTimeoutMS: 45000,          // Increase socket timeout
  connectTimeoutMS: 50000
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Node API is running on port http://localhost:${port}`);
  });
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});
