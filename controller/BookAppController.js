import BookAppModel from "../Model/BookAppModel.js";

export async function bookAppointment(req, res) {
    try {
        const { service, date, time, customerName, customerEmail } = req.body;
        const newAppointment = new BookAppModel({ service, date, time, customerName, customerEmail });
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully', newAppointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   

export async function getAppointments( req, res) {
    try {
        const appointments = await BookAppModel.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
