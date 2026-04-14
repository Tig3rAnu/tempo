import { Router } from 'express';
import * as adminController from '../controllers/adminController.js';

const router = Router();

// quick stats
router.get('/stats', adminController.getStats);

// user management endpoints
router.get('/users', adminController.listUsers);
router.get('/users/:id', adminController.getUser);
router.post('/users', adminController.createUser);
router.post('/users/:id/approve', adminController.approveUser);
router.post('/users/:id/reject', adminController.rejectUser);
router.post('/users/:id/suspend', adminController.suspendUser);
router.post('/users/:id/reactivate', adminController.reactivateUser);
router.post('/users/:id/reset-password', adminController.resetPassword);
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id', adminController.updateUser);

// countries
router.get('/countries', adminController.listCountries);
router.get('/countries/:id', adminController.getCountry);
router.post('/countries', adminController.createCountry);
router.put('/countries/:id', adminController.updateCountry);
router.delete('/countries/:id', adminController.deleteCountry);

// facilities
router.get('/facilities', adminController.listFacilities);
router.post('/facilities', adminController.createFacility);
router.put('/facilities/:id', adminController.updateFacility);
router.delete('/facilities/:id', adminController.deleteFacility);

// departments
router.get('/departments', adminController.listDepartments);
router.post('/departments', adminController.createDepartment);
router.put('/departments/:id', adminController.updateDepartment);
router.delete('/departments/:id', adminController.deleteDepartment);

// intakes
router.get('/intakes', adminController.listIntakes);
router.post('/intakes', adminController.createIntake);
router.put('/intakes/:id', adminController.updateIntake);
router.delete('/intakes/:id', adminController.deleteIntake);

// levels
router.get('/levels', adminController.listLevels);
router.post('/levels', adminController.createLevel);
router.put('/levels/:id', adminController.updateLevel);
router.delete('/levels/:id', adminController.deleteLevel);

// q exams
router.get('/q-exams', adminController.listQExams);
router.post('/q-exams', adminController.createQExam);
router.put('/q-exams/:id', adminController.updateQExam);
router.delete('/q-exams/:id', adminController.deleteQExam);

// q degrees
router.get('/q-degrees', adminController.listQDegrees);
router.post('/q-degrees', adminController.createQDegree);
router.put('/q-degrees/:id', adminController.updateQDegree);
router.delete('/q-degrees/:id', adminController.deleteQDegree);

// courses
router.get('/courses', adminController.listCourses);
router.get('/courses/:id', adminController.getCourse);
router.post('/courses', adminController.createCourse);
router.put('/courses/:id', adminController.updateCourse);
router.delete('/courses/:id', adminController.deleteCourse);


export default router;
