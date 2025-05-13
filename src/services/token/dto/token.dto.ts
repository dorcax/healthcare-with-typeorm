import { IsString } from "class-validator"

export class TokenDto{
 

    @IsString()
    subject:string


     @IsString()
    code:string

    
    @IsString()
    expiry:Date

   
}