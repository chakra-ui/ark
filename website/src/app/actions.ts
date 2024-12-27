'use server'
import { Schema } from '@effect/schema'
import { Effect, Match, pipe } from 'effect'
import { auth } from '~/lib/auth'
import { prisma } from '~/lib/prisma'

export const findLicenseKeysByOrderId = async (externalId: string): Promise<string> =>
  Effect.runPromise(
    pipe(
      Effect.tryPromise({
        try: () =>
          prisma.order.findUniqueOrThrow({
            where: {
              externalId,
              createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
            },
            include: { orderItems: { include: { licenseKey: true } } },
          }),
        catch: () => new Error(),
      }),
      Effect.map((order) => order.orderItems.map((item) => item.licenseKey.key)[0]),
      Effect.catchAll(() => Effect.succeed('')),
    ),
  )

const Input = Schema.Struct({
  licenseKey: Schema.String.pipe(Schema.pattern(/^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/)),
})

export const activateLicense = async (_: unknown, formData: FormData) =>
  Effect.runPromise(
    pipe(
      Effect.all([
        pipe(
          Effect.promise(() => auth()),
          Effect.map((session) => session?.user?.id),
          Effect.filterOrFail(
            (userId): userId is string => typeof userId === 'string',
            () => new UnauthorizedError(),
          ),
        ),
        pipe(
          Schema.decodeUnknown(Input)({ licenseKey: formData.get('licenseKey') }),
          Effect.map((input) => input.licenseKey),
          Effect.flatMap((key) =>
            Effect.tryPromise({
              try: () => prisma.licenseKey.findUniqueOrThrow({ where: { key } }),
              catch: (e) =>
                Match.value(e).pipe(
                  Match.when({ code: 'P2025' }, () => new NotFoundError(key)),
                  Match.orElse(() => new InternalServerError()),
                ),
            }),
          ),
          Effect.filterOrFail(
            (licenseKey) => licenseKey.userId === null,
            () => new ConflictError(),
          ),
        ),
      ]),
      Effect.flatMap(([userId, licenseKey]) =>
        Effect.tryPromise({
          try: () =>
            prisma.licenseKey.update({
              where: { id: licenseKey.id },
              data: {
                user: {
                  connect: { id: userId },
                },
              },
            }),
          catch: () => new InternalServerError(),
        }),
      ),
      Effect.map(() => ({ success: true, message: 'License key activated' })),
      Effect.catchTags({
        ParseError: () => Effect.succeed({ success: false, message: 'License key is invalid' }),
        UnauthorizedError: () =>
          Effect.succeed({ success: false, message: 'Please log in to activate your license key' }),
        NotFoundError: () => Effect.succeed({ success: false, message: 'License key not found' }),
        ConflictError: () =>
          Effect.succeed({ success: false, message: 'License key is already in use' }),
        InternalServerError: () =>
          Effect.succeed({ success: false, message: 'An unexpected error occured' }),
      }),
    ),
  )

export const hasUserPermission = async () =>
  Effect.runPromise(
    pipe(
      Effect.promise(() => auth()),
      Effect.map((session) => session?.user?.id),
      Effect.filterOrFail(
        (userId): userId is string => typeof userId === 'string',
        () => new UnauthorizedError(),
      ),
      Effect.flatMap((userId) =>
        Effect.tryPromise({
          try: () =>
            prisma.licenseKey.findFirst({
              where: { userId },
            }),
          catch: () => new InternalServerError(),
        }),
      ),
      Effect.map((license) => license !== null),
      Effect.catchAll(() => Effect.succeed(false)),
    ),
  )

class InternalServerError {
  readonly _tag = 'InternalServerError'
}

class NotFoundError {
  readonly _tag = 'NotFoundError'
  constructor(readonly id: string) {}
}

class ConflictError {
  readonly _tag = 'ConflictError'
}

class UnauthorizedError {
  readonly _tag = 'UnauthorizedError'
}

interface FormState {
  success?: boolean | undefined
  message: string
}

export const contact = async (_prevState: unknown, formData: FormData): Promise<FormState> => {
  return Effect.runPromise(
    pipe(
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
        catch: () => new Error(),
      }),
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
