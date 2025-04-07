import dotenv from "dotenv";
import express from "express";
import {register, login} from "./users.controller";
dotenv.config()
const router: express.Router= express.Router();
router.post('/register', register);
router.post('/login', login);
export default router;

