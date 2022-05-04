import nodemailer from 'nodemailer'
import { MailUtils, SendMailData } from '../mail.utils'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'dbe0bb38d05e7a',
    pass: '50601151861b66'
  }
})

export class NodeMailerMailUtils implements MailUtils {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Tamara Organ <tamara@organ.dev.br>',
      subject,
      html: body
    })
  }
}
