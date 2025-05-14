import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { Auth, isCurrentUser } from 'src/module/auth/decorator/auth.decorator';
import { Role, User } from 'src/module/auth/entity/auth.entity';
import { TokenDto } from './dto/token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  // @Auth(Role.USER)
  // @Post()
  // async createToken(@Body() dto:TokenDto ,@isCurrentUser() user:User){
  //   return await this.tokenService.createToken(dto,user)
  // }
}
