import {IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Email is required'})
    @Matches(/^\S*$/, {message: 'Email must not contain spaces'})
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {message: 'Email must be a valid email address'})
    @IsEmail({}, {message: 'Email must be a valid email address'})
    email!: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string'})
    @MinLength(12, {message: 'Password must be at least 12 characters long'})
    @Matches(/(?=.*[A-Z])/, {
        message: 'Password must contain at least one uppercase letter',
    })
    @Matches(/(?=.*[0-9])/, {
        message: 'Password must contain at least one number',
    })
    @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
        message: 'Password must contain at least one special character',
    })
    @Matches(/^\S*$/, {message: 'Password must not contain spaces'})
    password!: string;

    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name must be a string'})
    @Matches(/^[a-zA-Z]+$/, {message: 'Name must contain only letters'})
    @Matches(/^\S*$/, {message: 'Name must not contain spaces'})
    name!: string;

    @IsOptional()
    @IsString({message: 'Role must be a string'})
    role?: string;
}