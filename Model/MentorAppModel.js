import { Schema, model } from 'mongoose';

const mentorAppSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  farmLocation: {
    type: String,
    required: true,
    trim: true
  },
  farmSize: {
    type: Number,
    required: true
  },
  yearsOfDairyFarming: {
    type: Number,
    default: 0
  },
  typeOfDairyFarm: {
    type: String,
    required: true,
  },
  mentorshipGoals: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const MentorModel=model('MentorApp', mentorAppSchema);
export default MentorModel;