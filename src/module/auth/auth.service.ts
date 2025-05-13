import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  User } from './entity/auth.entity';
import { ILike, Repository } from 'typeorm';
import { AuthDto, forgotPasswordDto, LoginDto } from './dto/auth.dto';
import * as argon2 from "argon2"
import { IsJWT } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/services/token/token.service';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly authRepository: Repository<User>,
        private readonly jwt: JwtService,
    private readonly tokenService:TokenService) { }

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
    async forgetPassword(dto: forgotPasswordDto) {
        const { email } = dto
        const user = await this.authRepository.findOne({
            where: {
                email: email.trim()
            }
        })
        console.log(user)
        if (!user) {
            throw new NotFoundException("user not found")
        }
        // const sendCode =await this.tokenService.createToken()
        return {
            message: "link sent to user"
        }

    }
    // find all user  
    async getUser() {

        return await this.authRepository.find()


    }

}
