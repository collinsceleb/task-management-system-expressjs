import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    user?: string;

    @IsString()
    @IsOptional()
    assignee?: string;
}