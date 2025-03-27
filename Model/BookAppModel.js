import { Schema, model } from 'mongoose';

const AppointmentSchema = new Schema({
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true }
}, { timestamps: true });

const BookAppModel= model('Appointment', AppointmentSchema);
export default BookAppModel;