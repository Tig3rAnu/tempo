import { Router } from 'express';
import * as adminController from '../controllers/adminController.js';

const router = Router();

// list and get courses (admin controller is already handling populate)
router.get('/', adminController.listCourses);
router.get('/:id', adminController.getCourse);
router.post('/', adminController.createCourse);
router.put('/:id', adminController.updateCourse);
router.delete('/:id', adminController.deleteCourse);

export default router;
