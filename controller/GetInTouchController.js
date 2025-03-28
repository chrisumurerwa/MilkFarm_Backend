import GetInTouchModel from '../Model/GetInTouchModel.js';

// Handle the "Get In Touch" form submission
export const submitGetInTouchForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields (Name, Email, Message) are required.' });
    }

    // Create a new "Get In Touch" entry
    const newMessage = new GetInTouchModel({
      name,
      email,
      message,
    });
    // Save the new message to the database
    await newMessage.save();

    res.status(201).json({ message: 'Your message has been successfully submitted.' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting message. Please try again later.' });
  }
};

// Get all "Get In Touch" submissions (for admin to view)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await GetInTouchModel.find().sort({ createdAt: -1 }); // Latest messages first
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages.' });
  }
};
