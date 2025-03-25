import Contact from "../Model/ContactModel.js"; // ✅ Correct import


export const CreateContact = async (req, res) => {
    try {
        const { Name, Email, phoneNumber, Message } = req.body;

        // Validate required fields
        if (!Name || !Email || !phoneNumber || !Message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // ✅ Corrected model instantiation
        const newContact = new Contact({ Name, Email, phoneNumber, Message });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Contact created successfully",
            Contact: newContact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }

};

export const ListContact = async (_req, res) => {
    try {
        const foundContacts = await Contact.find();
        
        return res.status(200).json({
            success: true,  // ✅ Make response structure consistent
            message: "Contacts retrieved successfully",
            contacts: foundContacts, // ✅ Use lowercase and plural for clarity
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};


