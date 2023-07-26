import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/shared/Button'
import { Text } from '@/components/shared/Text'
import { Stack, styled } from '@/panda/jsx'
import { hoverCard } from '@/panda/recipes'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
  Portal,
} from '@ark-ui/react'
import { FiMapPin } from 'react-icons/fi'

export const DemoHoverCard = () => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <a href="https://github.com/segunadebayo" target="_blank" rel="noreferrer">
        <Avatar
          name="Segun Adebayo"
          size="lg"
          src="https://avatars2.githubusercontent.com/u/6916170"
        />
      </a>
    </HoverCardTrigger>
    <Portal>
      <HoverCardPositioner className={hoverCard()}>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          <Stack gap="4">
            <Stack direction="row" justifyContent="space-between" width="full">
              <Avatar name="Segun Adebayo" src="https://avatars2.githubusercontent.com/u/6916170" />
              <Button variant="secondary" size="xs" onClick={() => alert('Follow')}>
                Follow
              </Button>
            </Stack>
            <Stack gap="2">
              <Stack gap="1">
                <Stack direction="row" gap="1">
                  <styled.span textStyle="sm" fontWeight="semibold">
                    segunadebayo
                  </styled.span>
                  <styled.span textStyle="sm" color="fg.muted">
                    Segun Adebayo
                  </styled.span>
                </Stack>
                <Text textStyle="sm">Building @chakra-ui ⚡️. Design Systems and UI Engineer</Text>
              </Stack>
              <Stack direction="row" gap="1" alignItems="center" color="fg.subtle">
                <FiMapPin fontSize="0.875rem" />
                <Text textStyle="xs">Dubai, United Arab Emirates</Text>
              </Stack>
            </Stack>
          </Stack>
        </HoverCardContent>
      </HoverCardPositioner>
    </Portal>
  </HoverCard>
)
