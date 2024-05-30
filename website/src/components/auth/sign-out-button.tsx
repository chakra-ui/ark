import { LogOutIcon } from 'lucide-react'
import { Button, type ButtonProps } from '~/components/ui/button'
import { signOut } from '~/lib/auth'

export const SignOutButton = (props: ButtonProps) => {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button type="submit" variant="subtle" size="xs" width="full" {...props}>
        Sign Out <LogOutIcon />
      </Button>
    </form>
  )
}
