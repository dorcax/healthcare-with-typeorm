import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import { TaskModule } from './module/task/task.module';
import { datasourceOptions } from './config/typeorm.config';
import { TokenModule } from './services/token/token.module';
import { MailModule } from './services/mail/mail.module';
import { AxiosModule } from './services/axios/axios.module';
import { PaymentModule } from './services/payment/payment.module';




@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot(datasourceOptions)

  //   TypeOrmModule.forRoot({
  
   
   
  //      host:"localhost",
  //     type:"postgres",
  //      port: 5432,
  //     // url:config.get<string>("DATABASE_URL"),
  //     password:"dorcas12345",
  //     username:"postgres",
  //     // database:"TodoDB",

  //     synchronize:true,


  //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //     autoLoadEntities: true,
   
    
    
    
  // }),
  ,
   AuthModule, TaskModule, TokenModule, MailModule, AxiosModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
