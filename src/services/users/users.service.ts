import {CreateUserDto} from "./users.dto";
import {UserModel} from "../../models";
import {CreateAuthDto} from "./create-auth.dto";



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

export const loginUser = async (createAuthDto: CreateAuthDto) => {
    try {
        const {email, password} = createAuthDto;
        const user = await userModel.findOne({email});
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        return user;
    } catch (e: Error | any) {
        throw new Error(e.message);
    }
}