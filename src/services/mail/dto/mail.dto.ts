export class MailDto {
    to:string
    subject: string
    context: {
        name:string ,
        code:string,
     
    }
    template:any
}