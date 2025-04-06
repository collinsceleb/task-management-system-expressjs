import dotenv from "dotenv";
import express from "express";
import {register} from "./users.controller";
dotenv.config()
const router: express.Router= express.Router();
router.post('/register', register);
export default router;

