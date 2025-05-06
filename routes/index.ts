import express from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { createAssistant, getAssistants , updateAssistant } from '../controllers/assistantController';
import { createLog, getLogs } from '../controllers/logController';
import { loginUser } from '../controllers/authController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.post('/users/login', loginUser);
router.post('/users/register', createUser);
router.get('/users', getUsers);

router.post('/assistants' ,authenticate, createAssistant);
router.put('/assistants/:id' ,authenticate, updateAssistant);
router.get('/assistants', getAssistants);

router.post('/logs', createLog);
router.get('/logs', getLogs);

export default router;
