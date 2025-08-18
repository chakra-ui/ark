import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import { randomInt } from 'node:crypto'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Postmark from 'next-auth/providers/postmark'

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: String(token.sub) },
    }),
  },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GitHub,
    Google,
    Postmark({
      from: 'Ark UI <noreply@ark-ui.com>',
      maxAge: 500, // 500 seconds
      generateVerificationToken() {
        return randomInt(100000, 999999).toString()
      },
      sendVerificationRequest: async (params) => {
        const { identifier: to, provider, url, token } = params
        const { host } = new URL(url)
        if (!provider.apiKey) throw new TypeError('Missing Postmark API Key')
        const res = await fetch('https://api.postmarkapp.com/email', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': provider.apiKey,
          },
          body: JSON.stringify({
            From: provider.from,
            To: to,
            Subject: `Sign in to ${host}`,
            TextBody: text({ token }),
            HtmlBody: html({ token }),
            MessageStream: 'outbound',
          }),
        })

        if (!res.ok) {
          throw new Error(`Postmark error: ${JSON.stringify(await res.json())}`)
        }
      },
    }),
  ],
})

function html(params: { token: string }) {
  const { token } = params

  const brandColor = '#EB5E41'
  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: '#fff',
  }

  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Sign in to <strong>Ark UI</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <div style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: ${color.text}; font-weight: bold; letter-spacing: 4px; padding: 20px; background: ${color.background}; border-radius: 8px; border: 2px solid ${color.buttonBorder};">
            ${token}
          </div>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Enter this code on the sign-in page. This code will expire in 3 minutes.
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ token }: { token: string }) {
  return `
  Sign in to Ark UI
  
  Sign in code: ${token}
  
  Keep in mind that this code will expire after 3 minutes. If you did not request this email you can safely ignore it.
  `
}
