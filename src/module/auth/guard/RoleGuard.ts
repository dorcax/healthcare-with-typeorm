import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../entity/auth.entity";
import { ROLES_KEY } from "../decorator/role.decorator";


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRole  =this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getClass(),
            context.getHandler()
        ])
        console.log(requiredRole)
        if(!requiredRole){
            return true
        }
        // find user  
        const {user} =context.switchToHttp().getRequest()
        if(!user){
            throw new UnauthorizedException()
        }
        return   requiredRole.some((role)=>user.role?.includes(role))
        //  requiredRole.includes(user.role)
        
    }
}