import { IsNumber, IsObject, IsString } from "class-validator"
import { User } from "src/module/auth/entity/auth.entity"

export class TokenDto{
 

    @IsString()
    subject:string
       

    @IsNumber()
    userId:number


   

    
    @IsString()
    expiry:Date
    
    
   

   
}