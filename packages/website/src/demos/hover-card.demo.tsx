import { Portal } from '@ark-ui/react'
import { MapPinIcon } from 'lucide-react'
import { HStack, Stack, styled } from 'styled-system/jsx'
import { Avatar, HoverCard, Icon, Text, type HoverCardProps } from '~/components/ui'

export const Demo = (props: HoverCardProps) => (
  <HoverCard.Root {...props}>
    <HoverCard.Trigger asChild>
      <styled.a
        href="https://twitter.com/grizzly_codes/"
        target="_blank"
        textStyle="sm"
        fontWeight="medium"
      >
        @grizzly_codes
      </styled.a>
    </HoverCard.Trigger>
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          <Stack gap="4" direction="row">
            <Avatar.Root>
              <Avatar.Fallback>CS</Avatar.Fallback>
              <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056" alt="avatar" />
            </Avatar.Root>
            <Stack gap="3">
              <Stack gap="1">
                <Text textStyle="sm" fontWeight="semibold">
                  @grizzly_codes
                </Text>
                <Text textStyle="sm" color="fg.muted">
                  Staff Software Engineer working at vivenu GmbH
                </Text>
              </Stack>
              <HStack gap="1" color="fg.subtle" textStyle="xs">
                <Icon>
                  <MapPinIcon />
                </Icon>
                <Text>Joined Dezember 2011</Text>
              </HStack>
            </Stack>
          </Stack>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  </HoverCard.Root>
)
