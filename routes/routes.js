// import cors from 'cors';
import express from 'express';
import { login, register } from '../controllers/user.js';
import { getTasks, postTask, deleteTask, updateTask } from '../controllers/post.js';

const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.post('/task', postTask);

router.put('/task/update', updateTask);

router.get('/post/tasks', getTasks);

router.delete('/delete',deleteTask)


export default router;