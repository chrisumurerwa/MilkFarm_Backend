import express from "express";
import Contact from "./ContactRoute.js"
import User from "./userRoute.js"
const route = express.Router();
route.use("/contact", Contact);
route.use("/user", User);
export default route;
