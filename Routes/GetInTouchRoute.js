import express from 'express';
import { submitGetInTouchForm, getAllMessages } from '../controller/GetInTouchController.js';

const router = express.Router();

// Route to handle form submission (POST request)
router.post('/submit', submitGetInTouchForm);

// Route to fetch all "Get In Touch" messages (for admins) - optional (GET request)
router.get('/messages', getAllMessages);

export default router;
