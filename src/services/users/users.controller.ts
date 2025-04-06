import { registerUser } from "./users.service";
import {Request, Response} from "express";
import {CreateUserDto} from "./users.dto";

export const register = async (req: Request, res: Response) => {
    try {
        const userData: CreateUserDto = req.body;
        const user = await registerUser(userData);
        res.status(201).json({user, message: 'User registered successfully.'});
    } catch (e) {
            res.status(400).json({message: 'Registration failed', e});
    }
}