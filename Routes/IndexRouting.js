import express from "express";
import book from "./BookAppRoute.js"

import User from "./userRoute.js"
import { getAppointments } from "../controller/BookAppController.js";
import  {createMentorApplication, getAllMentorApplications} from "../controller/MentorAppController.js"
import { submitGetInTouchForm, getAllMessages } from "../controller/GetInTouchController.js";
const route = express.Router();

route.use("/user", User);
route.use("/bookAppointment", book);
route.use("/getAppointments/:id", getAppointments);
route.use("/apply", createMentorApplication);
// route.use("/", getAllMentorApplications);
route.use("/submit", submitGetInTouchForm);
route.use("/messages", getAllMessages);

export default route;
