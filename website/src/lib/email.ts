import * as postmark from 'postmark'

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY)

interface SendEmailArgs {
  subject: string
  content: string
  email: string
}

export const sendEmail = async ({ email, subject, content }: SendEmailArgs) =>
  client.sendEmail({
    From: 'Ark UI <noreply@ark-ui.com>',
    To: email,
    Subject: subject,
    TextBody: content,
  })
