import { IUser } from '../../services/users/users.model';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
