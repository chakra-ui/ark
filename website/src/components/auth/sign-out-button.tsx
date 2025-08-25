'use client'
import { LogOutIcon } from 'lucide-react'
import { Button, type ButtonProps } from '~/components/ui/button'
import { signOut } from '~/lib/auth-client'

export const SignOutButton = (props: ButtonProps) => {
  return (
    <Button
      type="submit"
      variant="subtle"
      size="xs"
      width="full"
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess() {
              window.location.href = '/'
            },
          },
        })
      }}
      {...props}
    >
      Sign Out <LogOutIcon />
    </Button>
  )
}
