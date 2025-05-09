import express from 'express';
import multer  from 'multer';

import { createUser, getUsers } from '../controllers/userController';
import { createAssistant, getAssistants , updateAssistant } from '../controllers/assistantController';
import { createLog, getLogs } from '../controllers/logController';
import { loginUser } from '../controllers/authController';
import authenticate from '../middleware/authenticate';
import { createFile , getFile , readFile } from '../controllers/fileController';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null , 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({
    storage: storage,
  }).single('pdfFile');


router.post('/users/login', loginUser);
router.post('/users/register', createUser);
router.get('/users', getUsers);

router.post('/assistants' ,authenticate, createAssistant);
router.put('/assistants/:id' ,authenticate, updateAssistant);
router.get('/assistants', getAssistants);

router.post('/logs', createLog);
router.get('/logs', getLogs);

router.post('/files' , authenticate , upload , createFile);
router.get('/files' , getFile);
router.post('/files/:filename' , readFile);



export default router;
