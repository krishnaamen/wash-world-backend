import { IsDate, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";

export class UserSignUpDto extends UserSignInDto{
    @IsNotEmpty({message:'Firstname cannot be null'}) //for validate the data
    @IsString({message:'Firstname must be string'})
    firstName:string;
    
    @IsNotEmpty({message:'Firstname cannot be null'}) 
    @IsString({message:'Firstname must be string'})
    lastName:string;


    
    @IsNotEmpty({message:'username cannot be null'}) 
    @IsString({message:'name must be string'})
    username:string;
    
}