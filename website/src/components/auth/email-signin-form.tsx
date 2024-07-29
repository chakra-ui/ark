import { Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { signIn } from '~/lib/auth'

interface Props {
  redirectTo: string
}

export const EmailSignInForm = (props: Props) => {
  const { redirectTo } = props

  return (
    <form
      action={async (formData) => {
        'use server'
        await signIn('postmark', {
          email: formData.get('email'),
          redirectTo,
        })
      }}
    >
      <Stack gap="3">
        <Input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          autoComplete="off"
        />
        <Button type="submit" width="full">
          Continue with Email
        </Button>
      </Stack>
    </form>
  )
}
