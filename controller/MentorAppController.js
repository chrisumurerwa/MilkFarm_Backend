import MentorModel from '../Model/MentorAppModel.js';
export const createMentorApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      farmLocation,
      farmSize,
      yearsOfDairyFarming,
      typeOfDairyFarm,
      mentorshipGoals
    } = req.body;

    // Validate required fields
    if (
      !fullName || 
      !email || 
      !phoneNumber || 
      !farmLocation || 
      !farmSize || 
      !yearsOfDairyFarming || 
      !typeOfDairyFarm || 
      !mentorshipGoals
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if email already exists
    const existingApplication = await MentorModel.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'An application with this email already exists'
      });
    }

    // Create new mentor application
    const newMentorApp = new MentorModel({
      fullName,
      email,
      phoneNumber,
      farmLocation,
      farmSize,
      yearsOfDairyFarming,
      typeOfDairyFarm, 
      mentorshipGoals
    });

    // Save to database
    const savedApplication = await newMentorApp.save();

    res.status(201).json({
      success: true,
      message: 'Mentor application submitted successfully',
      data: savedApplication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting mentor application',
      error: error.message
    });
  }
};

// Get all mentor applications
export const getAllMentorApplications = async (req, res) => {
  try {
    const applications = await MentorModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving mentor applications',
      error: error.message
    });
  }
};

// Get a single mentor application by ID
export const getMentorApplicationById = async (req, res) => {
  try {
    const application = await MentorModel.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Mentor application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving mentor application',
      error: error.message
    });
  }
};
