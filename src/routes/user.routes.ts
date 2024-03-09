import { Router } from 'express';
import checkUserAndTotp from '../common/middleware/checkUserAndTotp';
import { validateLoginBody, validateUserBody } from '../common/utils/validator';
import { createUser, generateTOTP, loginUser } from '../controllers/user.controller';
const router: Router = Router();

router.get('/generate-totp', generateTOTP);
// router.get('/otp', generateOTP);
router.post('/login', validateLoginBody, checkUserAndTotp, loginUser);
router.post('/create', validateUserBody, createUser);

export default router;
