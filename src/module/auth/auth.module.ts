import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from './entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenModule } from 'src/services/token/token.module';
import { Token } from 'src/services/token/entity/token.entity';
import { MailService } from "../../services/mail/mail.service";
import { MailModule } from 'src/services/mail/mail.module';


@Module({
  imports: [MailModule,ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User,Token]), JwtModule.registerAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      global: true,
      secret: config.get<string>("JWT_SECRET"),
      signOptions: {
        expiresIn: "1d"
      }
    })


  }),

TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
