import express from "express";
import book from "./BookAppRoute.js"
import Contact from "./ContactRoute.js"
import User from "./userRoute.js"
import { getAppointments } from "../controller/BookAppController.js";
import  {createMentorApplication, getAllMentorApplications} from "../controller/MentorAppController.js"
const route = express.Router();
route.use("/contact", Contact);
route.use("/user", User);
route.use("/bookAppointment", book);
route.use("/getAppointments/:id", getAppointments);
route.use("/apply", createMentorApplication);
route.use("/", getAllMentorApplications);
export default route;
