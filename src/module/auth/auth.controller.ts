import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, isCurrentUser } from './decorator/auth.decorator';
import { AuthDto, forgotPasswordDto, LoginDto, resetPasswordDto, verificationCodeDto } from './dto/auth.dto';
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
  @Post("verify-otp")
  async  verificationCode(@Body() dto:verificationCodeDto,@isCurrentUser() user:User) {
    return await this.authService.verificationCode(dto,user)

  }

  @Auth(Role.USER)
  @Post("reset-password")
  async  resetPassword(@Body() dto:resetPasswordDto,@isCurrentUser() user:User) {
    return await this.authService.resetPassword(dto,user)

  }

  @Auth(Role.USER)
  @Get()
  async getUser(@isCurrentUser() user:User) {
    console.log("uuuu",user)
    return await this.authService.getUser(user)
  }

}
