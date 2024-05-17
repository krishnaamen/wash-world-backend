import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignInDto{
    @IsNotEmpty({message:'email cannot be empty'}) 
    email:string;
    @IsNotEmpty({message:'password cannot be empty'})
    @MinLength(8,{message:'password must be atleast 8 characters'})
    password:string;
    

}