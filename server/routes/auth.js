import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const router = Router();

// registration and verification flow
router.post('/register', authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/verify-phone', authController.verifyPhone);
router.post('/verify', (req, res, next) => authController.verifyEmail(req, res, next)); // legacy redirect
router.post('/upload-documents', authController.uploadDocuments);

// authentication
router.post('/login', authController.login);
router.post('/admin-login', authController.adminLogin);

export default router;
