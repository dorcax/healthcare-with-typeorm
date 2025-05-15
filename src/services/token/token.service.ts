import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/module/auth/entity/auth.entity';
import { Repository } from 'typeorm';
import { TokenDto, VerifyDto } from './dto/token.dto';
import { Token } from './entity/token.entity';

@Injectable()
export class TokenService {
    constructor( @InjectRepository(Token) private readonly tokenRepository:Repository<Token>){}
    async createToken(dto:TokenDto,user:User){
        const codeToken =await this.generateCode()
        const token =await this.tokenRepository.create({
         ...dto,
         code:codeToken,
         user
         
         
        })
        // token.user =user
        return this.tokenRepository.save(token)
    }

    async generateCode(){
        return Math.floor(1000 + Math.random()*9000)
    }


    // verify otp 
    async verifyOtp(dto:VerifyDto){
        const {code} =dto 
        // find if the user exist 
        const token =await this.tokenRepository.findOne({
            where:{
                code:code
            }
        })
          if(!token){
            throw new NotFoundException("invalid code ")
          }

          if(new Date(token.expiry).getTime() < Date.now()){
              await this.tokenRepository.delete(token.id)
             throw new BadRequestException("the otp code have expired")
          }
       return true;

    }
}
