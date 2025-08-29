import { lemonSqueezy, type Purchase } from '@chakra-ui/better-auth'
import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { customSession, emailOTP } from 'better-auth/plugins'
import { Effect, pipe } from 'effect'
import { Pool } from 'pg'
import { sendEmail } from './email'

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_URL,
  database: new Pool({
    connectionString: process.env.AUTH_DATABASE_URL,
  }),
  telemetry: { enabled: false },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        console.log(`Sending OTP to ${email}: ${otp}`)
        await sendEmail({
          email,
          subject: `Your OTP Code ${otp}`,
          content: `Sign in to your account using the OTP code below: ${otp}`,
        })
      },
    }),
    lemonSqueezy({
      webhookSecret: process.env.LEMON_SQUEEZY_WEBHOOK_SECRET,
      products: [
        {
          name: 'Ark UI Plus',
          variants: ['Personal', 'Team'],
        },
      ],
    }),
    customSession(({ user, session }, ctx) =>
      Effect.runPromise(
        pipe(
          Effect.tryPromise({
            try: () =>
              ctx.context.adapter.findMany<Purchase>({
                model: 'purchase',
                where: [
                  {
                    field: 'userId',
                    value: user.id,
                  },
                  {
                    field: 'status',
                    value: 'active',
                  },
                ],
              }),
            catch: () => Effect.succeed([]),
          }),
          Effect.map((purchases) => purchases.map((purchase) => purchase.productId)),
          Effect.map((purchases) => ({
            user,
            session,
            purchases,
          })),
        ),
      ),
    ),
    nextCookies(),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
})
