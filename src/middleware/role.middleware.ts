import { Request, Response, NextFunction } from 'express';
import { IUser } from '../services/users/users.model';


export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUser;

        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied. Not authorized.' });
        }

        next();
    };
};
