export class MailDto {
    to:string
    subject: string
    context: {
        name:string ,
        code:Number,
     
    }
    template:any
}