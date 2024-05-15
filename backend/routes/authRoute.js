import express from 'express';
import {register_user} from '../controller/auth.js';
import {login_user} from '../controller/auth.js';

const router = express.Router();

router.post('/register', register_user);
router.post('/login', login_user);

export default router;