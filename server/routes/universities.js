import { Router } from 'express';
import * as universityController from '../controllers/universityController.js';

const router = Router();

// GET /api/universities
router.get('/', universityController.listUniversities);
router.get('/:id', universityController.getUniversity);
router.post('/', universityController.createUniversity);
router.put('/:id', universityController.updateUniversity);
router.delete('/:id', universityController.deleteUniversity);

export default router;
