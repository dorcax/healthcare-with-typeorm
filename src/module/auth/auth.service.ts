import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from "argon2";
import { MailService } from 'src/services/mail/mail.service';
import { TokenService } from 'src/services/token/token.service';
import { Repository } from 'typeorm';
import { AuthDto, forgotPasswordDto, LoginDto, resetPasswordDto, verificationCodeDto } from './dto/auth.dto';
import { User } from './entity/auth.entity';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly authRepository: Repository<User>,
        private readonly jwt: JwtService,
        private readonly tokenService: TokenService,
    private readonly mailService:MailService) { }

    // create user
    async createUser(dto: AuthDto) {
        const { name, email, password } = dto

        // check if user have register
        const existingUser = await this.authRepository.findOne({
            where: {
                email
            }
        })
        if (existingUser) {
            throw new ConflictException("user already exist ")
        }
        // create user account 

        const newUser = await this.authRepository.save({
            name,
            email, password: await argon2.hash(password)
        })
        const { password: _, ...user } = newUser
        console.log(user)
        return {
            message: "user created successfully",
            newUser: user
        }


    }



    // login user 
    async loginUser(dto: LoginDto) {

        const { email, password } = dto
        // find user email 
        const existingUser = await this.authRepository.findOne({
            where: {
                email
            }
        })
        if (!existingUser) {
            throw new NotFoundException("user not found")

        }
        // compare password 
        const IsMatch = await argon2.verify(existingUser.password, password)
        if (!IsMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // create jwt token for them 
        const payload = { sub: existingUser.id, role: existingUser.role }

        const token = await this.jwt.signAsync(payload)

        return {
            message: "user logged in successfully",
            token: token
        }

    }
    // // forget  password  
    async forgetPassword(dto: forgotPasswordDto, user) {
        const { email } = dto
        const users = await this.authRepository.findOne({
            where: {
                email: email.trim(),
                id: user.sub

            }
        })
        console.log(user.sub)
        if (!users) {
            throw new NotFoundException("user not found")
        }
        const sendCode = await this.tokenService.createToken({
            subject: user.name,
            userId: user.id,
            expiry: new Date(Date.now() + 1000 * 60 * 15)
        }, users)
        console.log(sendCode)
        // configure email
        const sendOtpMail =await this.mailService.SendMail({
            to:users.email,
            subject:"user otp  for forget password",
            template:"otpMail",
            context:{
                name:users.name,
                code:sendCode.code
            }
        })
        
        return {
            message: "otp code  sent to user email"
        }

    }

    // verify otp 
    async verificationCode(dto:verificationCodeDto,user){
        const userExist =await this.authRepository.findOne({
            where:{
                id:user.sub
            },
            relations:{
                tokens:true
            }
        })
        if(!userExist){
            throw new NotFoundException("user does not exist ")
        }
        // verify the code  
        const code =dto.code
        const token =await this.tokenService.verifyOtp({code})
      
       return{
        message:"otp code verified successfully"
       }
    }

// reset password 
async resetPassword(dto:resetPasswordDto,user){
    const {password,confirmPassword} =dto 
    return await this.authRepository.update(
      {id:user.sub},
        {password:await argon2.hash(password)}
    )

}


    // find all user  
    async getUser(user) {
        const users = await this.authRepository.find({
            where: {
                id: user.sub,
            },
            relations: {
                tokens: true
            }
        })

        if (!users) {
            throw new NotFoundException("user not found ")
        }
        return users
    }

}



// webhook
// learn how migration work in typeorm
// learn payment integration
// learn how to style mail form with table using tailwind
// swagger documentation
