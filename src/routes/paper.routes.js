import express from 'express';
import { createPaper, getAllPapers, deletePaper } from '../controllers/paper.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Route to create a new paper submission
router.post('/', authenticate(['teacher', 'student']), createPaper);

// Route to retrieve all paper submissions
router.get('/', authenticate(['teacher', 'student', 'evaluator']), getAllPapers);

// Route to delete a paper submission
router.delete('/:id', authenticate(['teacher', 'evaluator']), deletePaper);

export default router;