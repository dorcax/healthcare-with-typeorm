import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Role } from "../entity/auth.entity";
import { Roles } from "./role.decorator";
import { AuthGuard } from "../guard/authGuard";
import { RoleGuard } from "../guard/RoleGuard";


// applyDecorators is used to multiple decorator
// export const Auth =(roles:Role[])=>{
//     return applyDecorators(
//         Roles(...roles),UseGuards(AuthGuard,RoleGuard)
//     )

// }


export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RoleGuard),
  );
}


export const isCurrentUser =createParamDecorator(
   async (data:unknown,ctx:ExecutionContext)=>{
  
    const request =ctx.switchToHttp().getRequest()
    return request.user
})