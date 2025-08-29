'use server'
import { Effect, pipe } from 'effect'
import { headers } from 'next/headers'
import { auth } from '~/lib/auth'
import { InternalServerError } from '~/lib/errors'

export const hasUserPermission = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.purchases.some((purchase) => purchase.startsWith('ark-ui-plus'))
}

interface FormState {
  success?: boolean | undefined
  message: string
}

const createSupportTicket = (formData: FormData) =>
  Effect.tryPromise({
    try: () =>
      fetch(`https://${process.env.FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${process.env.FRESHDESK_API_KEY}:X`).toString('base64')}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: `[Ark UI] ${formData.get('subject')}`,
          description: formData.get('message'),
          status: 2,
          priority: 1,
          source: 2,
          tags: ['ark-ui', 'website-contact'],
        }),
      }),
    catch: () => InternalServerError,
  })

const sendSlackMessage = (formData: FormData) =>
  Effect.tryPromise({
    try: () =>
      fetch(process.env.SLACK_WEBHOOK_URL, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          subject: formData.get('subject'),
          email: formData.get('email'),
          message: formData.get('message'),
          platform: 'Ark UI',
        }),
      }),
    catch: () => InternalServerError,
  })

export const contact = async (_prevState: unknown, formData: FormData): Promise<FormState> => {
  return Effect.runPromise(
    pipe(
      Effect.all([createSupportTicket(formData), sendSlackMessage(formData)]),
      Effect.map(() => ({ success: true, message: 'Your message has been sent successfully.' })),
      Effect.catchAll(() =>
        Effect.succeed({
          success: false,
          message: 'Whoops! Something went wrong. Please try again.',
        }),
      ),
    ),
  )
}
