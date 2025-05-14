import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';


@Module({
   exports: [MailService],
  imports:[MailerModule.forRoot({
  transport:{
    host:process.env.MAIL_HOST,
    port:Number(process.env.MAIL_PORT),
    secure:false,
    auth:{
      user:process.env.MAIL_USERNAME,
      pass:process.env.MAIL_PASSWORD
    }

  },
  defaults:{
    to:process.env.MAIL_DEFAULTNAME
  },
  template:{
     dir: process.cwd() + "src/services/template",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
  }

  })],
  // controllers: [MailController],
  providers: [MailService],

})
export class MailModule {}
