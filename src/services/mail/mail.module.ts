// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { Global, Module } from '@nestjs/common';
// import { MailService } from './mail.service';


// @Module({
//    exports: [MailService],
//   imports:[MailerModule.forRoot({
//   transport:{
//     host:process.env.MAIL_HOST,
//     port:Number(process.env.MAIL_PORT),
//     secure:false,
//     ignoreTLS: false,
//     auth:{
//       user:process.env.MAIL_USERNAME,
//       pass:process.env.MAIL_PASSWORD
//     }

//   },

//   defaults:{
//     to:process.env.MAIL_DEFAULTNAME
//   },
//   template:{
//      dir: process.cwd() + "/src/services/mail/template",
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//   }

//   })],
//   // controllers: [MailController],
//   providers: [MailService],

// })
// export class MailModule {}

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { existsSync } from 'fs'
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // Debug template path
        const templatePath = process.cwd() + "/src/services/mail/template";
        console.log('Template path:', templatePath);
        console.log('Path exists:', existsSync(templatePath));
        return {
          transport: {
            host: configService.get<string>("MAIL_HOST"),
            port: Number(configService.get<string>("MAIL_PORT")),
            secure: false,
            ignoreTLS: false,
            auth: {
              user: configService.get<string>("MAIL_USERNAME"),
              pass: configService.get<string>("MAIL_PASSWORD")
            }
          },
          defaults: {
            from: configService.get<string>("MAIL_DEFAULTNAME")
          },
          template: {
            dir: templatePath,
            // join(__dirname,templatePath),

            adapter: new HandlebarsAdapter(),

            options: {
              strict: true
            }
          }
        }
      }
    })],

  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
