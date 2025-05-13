import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './entity/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from './dto/token.dto'
import {v4 } from "uuid"

@Injectable()
export class TokenService {
    constructor( @InjectRepository(Token) private readonly tokenRepository:Repository<Token>){}
    async createToken(dto:TokenDto){
        return await this.tokenRepository.save({
         ...dto,
         code:v4()
        })
    }
}
