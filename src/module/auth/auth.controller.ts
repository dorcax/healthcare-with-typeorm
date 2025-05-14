import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, forgotPasswordDto, LoginDto } from './dto/auth.dto';
import { Auth, isCurrentUser } from './decorator/auth.decorator';
import { Role, User } from './entity/auth.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post()
  async create(@Body() dto: AuthDto) {
    return await this.authService.createUser(dto)

  }


  @Post("login")
  async login(@Body() dto: LoginDto) {
    return await this.authService.loginUser(dto)

  }
@Auth(Role.USER)
  @Post("forget-password")
  async forgetPassword(@Body() dto: forgotPasswordDto,@isCurrentUser() user:User) {
    return await this.authService.forgetPassword(dto,user)

  }


  @Auth(Role.USER)
  @Get()
  async getUser(@isCurrentUser() user:User) {
    console.log("uuuu",user)
    return await this.authService.getUser(user)
  }

}
