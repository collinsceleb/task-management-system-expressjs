import {loginUser, registerUser} from "./users.service";
import {Request, Response} from "express";
import {CreateUserDto} from "./users.dto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {CreateAuthDto} from "./create-auth.dto";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const generateToken = (user: any) => {
    return jwt.sign({id: user._id, role: user.role},
        JWT_SECRET,
        {expiresIn: '15m'});
};
export const register = async (req: Request, res: Response) => {
    try {
        const userData: CreateUserDto = req.body;
        const user = await registerUser(userData);
        res.status(201).json({user, message: 'User registered successfully.'});
    } catch (e) {
            res.status(400).json({message: 'Registration failed', e});
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const loginData: CreateAuthDto = req.body;
        const user = await loginUser(loginData);
        const token = generateToken(user);
        res.status(200).json({token, message: 'User logged in successfully.'});
    } catch (e) {
        res.status(400).json({message: 'Login failed', e});
    }
}