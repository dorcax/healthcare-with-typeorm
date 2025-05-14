import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Observable } from "rxjs";
import { User } from "../entity/auth.entity";
import { Repository } from "typeorm";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwt:JwtService,
        @InjectRepository(User) private readonly authRepository:Repository<User>
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request=context.switchToHttp().getRequest()
        const token  =await this.extractTokenFromHeader(request)
        if(!token){
            throw new UnauthorizedException("invalid credential")
        }
        try {
            const decoded =await this.jwt.verifyAsync(token)
            // find user 
             const user =await this.authRepository.findOne({
                where:{
                    id:decoded.sub
                }
             })
             if(!user){
                throw new NotFoundException("user not found ")
             }
             console.log("decoded",user)
            request.user ={
                ...decoded,
                user
            }
        } catch (error) {
            throw new UnauthorizedException()
        }
     return true
    }



    private extractTokenFromHeader(request: Request):string |undefined {
        const authHeader = request.headers.authorization
        if (authHeader && authHeader.startsWith("Bearer")) {
            return authHeader.split(' ')[1]
        }
        return undefined
    }
}