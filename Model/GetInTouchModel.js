import mongoose from 'mongoose';

// Define the schema for "Get In Touch" data
const getInTouchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email validation regex
    },
    message: {
      type: String,
      required: true,
      minlength: 2, // Minimum length of the message
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model
const GetInTouchModel = mongoose.model('GetInTouch', getInTouchSchema);
export default GetInTouchModel;
