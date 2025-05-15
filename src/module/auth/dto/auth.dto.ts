import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"



export class AuthDto{
    @IsString()
    @IsNotEmpty()
    name:string
     @IsEmail()
    @IsNotEmpty()
    email:string
    @IsString()
    @IsNotEmpty()
    password :string
}



export class LoginDto {
     @IsEmail()
    @IsNotEmpty()
    email:string
    @IsString()
    @IsNotEmpty()
    password :string
}

export class forgotPasswordDto{
     @IsEmail()
   
   email:string
}
export class verificationCodeDto{
 @IsNumber()
   code:number
}


export class resetPasswordDto{
      @IsString()
    @IsNotEmpty()
    password:string
      @IsString()
    @IsNotEmpty()
   confirmPassword:string
}