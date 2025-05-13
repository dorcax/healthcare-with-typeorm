import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from './entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenModule } from 'src/services/token/token.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),TokenModule, TypeOrmModule.forFeature([User]), JwtModule.registerAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      global: true,
      secret: config.get<string>("JWT_SECRET"),
      signOptions: {
        expiresIn: "1d"
      }
    })


  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
