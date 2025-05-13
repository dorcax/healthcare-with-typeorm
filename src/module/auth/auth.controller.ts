import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, forgotPasswordDto, LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async create(@Body() dto:AuthDto){
    return await  this.authService.createUser(dto)

  }
  

    @Post("login")
  async login(@Body() dto:LoginDto){
    return await this.authService.loginUser(dto)

  }

  @Post("forget-password")
  async forgetPassword(@Body() dto:forgotPasswordDto){
    return await this.authService.forgetPassword(dto)

  }
  
  @Get()
  async getUser(){
    return await this.authService.getUser()
  }
  
}
