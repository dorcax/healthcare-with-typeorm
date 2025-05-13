import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";




export class AuthGuard implements CanActivate {
    constructor(private readonly jwt:JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request=context.switchToHttp().getRequest()
        const token  =await this.extractTokenFromHeader(request)
        if(!token){
            throw new UnauthorizedException("invalid credential")
        }
        try {
            const decoded =await this.jwt.verifyAsync(token)
            request.user =decoded
        } catch (error) {
            throw new UnauthorizedException()
        }
     return true
    }



    private extractTokenFromHeader(request: Request) {
        const authHeader = request.headers.authorization
        if (authHeader && authHeader.startsWith("Bearer")) {
            return authHeader.split(' ')[' ']
        }
        return undefined
    }
}