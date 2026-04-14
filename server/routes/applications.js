import { Router } from 'express';
import * as appController from '../controllers/applicationController.js';

const router = Router();

router.post('/apply', appController.apply);
router.get('/user/:userId', appController.getByUser);
router.post('/:appId/admission-letter', appController.issueAdmissionLetter);
router.post('/:appId/pay-admission', appController.payAdmission);
router.post('/:appId/confirm-documents', appController.confirmDocuments);
router.post('/:appId/invitation-letter', appController.sendInvitationLetter);

export default router;
