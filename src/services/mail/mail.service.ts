import { Injectable } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailer:MailerService){}
    async SendMail (dto:MailDto){
        await this.mailer.sendMail({
            ...dto
        })

    }
}
