import { Router } from 'express';
const router = Router();
import { bookAppointment, getAppointments } from '../controller/BookAppController.js';

router.post('/bookAppointment', bookAppointment);
router.get('/getAppointments/:id', getAppointments);

export default router;
