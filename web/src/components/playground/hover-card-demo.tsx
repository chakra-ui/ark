import { Portal } from '@ark-ui/react'
import { FiMapPin } from 'react-icons/fi'
import { HStack, Stack, styled } from 'styled-system/jsx'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '~/components/ui/hover-card'
import { Typography } from '~/components/ui/typography'

export const HoverCardDemo = () => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <styled.a
        href="https://twitter.com/grizzly_codes/"
        target="_blank"
        textStyle="sm"
        fontWeight="medium"
      >
        @grizzly_codes
      </styled.a>
    </HoverCardTrigger>
    <Portal>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          <Stack gap="4" direction="row">
            <Avatar>
              <AvatarFallback>CS</AvatarFallback>
              <AvatarImage src="https://avatars.githubusercontent.com/u/1846056" alt="avatar" />
            </Avatar>
            <Stack gap="3">
              <Stack gap="1">
                <Typography textStyle="sm" fontWeight="semibold">
                  @grizzly_codes
                </Typography>
                <Typography textStyle="sm" color="fg.muted">
                  Staff Software Engineer working at vivenu GmbH
                </Typography>
              </Stack>
              <HStack gap="1" color="fg.subtle" textStyle="xs">
                <FiMapPin />
                <Typography>Joined Dezember 2011</Typography>
              </HStack>
            </Stack>
          </Stack>
        </HoverCardContent>
      </HoverCardPositioner>
    </Portal>
  </HoverCard>
)
