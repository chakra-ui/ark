'use client'
import { Box, Stack } from 'styled-system/jsx'
import { Avatar } from '~/components/ui/avatar'
import { Popover } from '~/components/ui/popover'
import { useSession } from '~/lib/auth-client'
import { SignOutButton } from './sign-out-button'

export const UserButton = () => {
  const { data: session, refetch } = useSession()

  if (session?.user) {
    return (
      <Popover.Root positioning={{ placement: 'bottom-end', gutter: 4 }} onOpenChange={({ open }) => open && refetch()}>
        <Popover.Trigger cursor="pointer">
          <Avatar src={session.user.image} name={session.user.name} size="xs" overflow="hidden" />
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Stack gap="4">
              <Box>
                <Popover.Title>{session.user.name}</Popover.Title>
                <Popover.Description>{session.user.email}</Popover.Description>
              </Box>
              <SignOutButton />
            </Stack>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    )
  }
}
