import {CreateUserDto} from "./users.dto";
import {UserModel} from "../../models";
import {IUser} from "./users.model";

const userModel = UserModel;
export const registerUser = async (createUserDto: CreateUserDto) =>{
    try {
        const {email, password, name} = createUserDto;
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const user = await userModel.create({email, password, name});
        await user.save()
        return user;
    } catch (e: Error | any) {
        throw new Error(e.message);
    }
}