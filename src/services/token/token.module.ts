import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entity/token.entity';
import { User } from 'src/module/auth/entity/auth.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Token,User])],
  controllers: [TokenController],
  providers: [TokenService,JwtService],
  exports:[TokenService]
  
})
export class TokenModule {}
