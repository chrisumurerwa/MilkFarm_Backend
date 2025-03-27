import { Router } from 'express';
const router = Router();
import { createMentorApplication, getAllMentorApplications, getMentorApplicationById } from '../controllers/MentorAppController';

// Route to submit a new mentor application
router.post('/apply', createMentorApplication);

// Route to get all mentor applications
router.get('/', getAllMentorApplications);

// Route to get a specific mentor application by ID
router.get('/:id', getMentorApplicationById);

export default router;