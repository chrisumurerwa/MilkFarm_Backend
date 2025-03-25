import express from "express";
import { CreateContact,ListContact } from "../Controller/ContactController.js";// ✅ Ensure the correct path

const router = express.Router();

// Define the POST route correctly
router.post("/addcontact", CreateContact);
router.get("/listcontacts", ListContact); 
export default router;
