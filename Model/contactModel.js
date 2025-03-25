import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    Message: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
