import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './entity/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from './dto/token.dto'
import {v4 } from "uuid"
import { User } from 'src/module/auth/entity/auth.entity';

@Injectable()
export class TokenService {
    constructor( @InjectRepository(Token) private readonly tokenRepository:Repository<Token>){}
    async createToken(dto:TokenDto,user:User){
        
        const token =await this.tokenRepository.create({
         ...dto,
         code:v4(),
         user
         
         
        })
        // token.user =user
        return this.tokenRepository.save(token)
    }
}
