import dotenv from "dotenv";
import express from "express";
import { createTask, getTasks, getTaskById, assignTask, markTaskAsCompleted, updateTask, deleteTask} from "./tasks.controller";
import {authenticate} from "../../middleware/auth.middleware";
import {authorizeRoles} from "../../middleware/role.middleware";

dotenv.config()
const router: express.Router= express.Router();
router.post('/create', authenticate, authorizeRoles('admin', 'manager'), createTask);
router.get('/tasks', authenticate, getTasks);
router.get('/:taskId', authenticate, getTaskById);
router.post('/assign/:taskId', authenticate, authorizeRoles('admin', 'manager'), assignTask);
router.post('/complete/:taskId', authenticate, markTaskAsCompleted);
router.patch('/update/:taskId', authenticate, updateTask);
router.delete('/delete/:taskId', authenticate, authorizeRoles('admin', 'manager'), deleteTask);
export default router;

