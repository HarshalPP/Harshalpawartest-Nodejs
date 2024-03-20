import express from 'express'
import { userService } from '../services/userservices.js';

const router = express.Router();

router.post('/signup', userService.signup);
router.post('/login', userService.login);
router.post('/logout', userService.logout);

export default router;
