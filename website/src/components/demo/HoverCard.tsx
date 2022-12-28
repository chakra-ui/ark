import { Stack } from '@/panda/jsx'
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
import { Avatar } from '../shared/Avatar'
import { Button } from '../shared/Button'
import { Text } from '../shared/Text'

export const DemoHoverCard = () => (
  <HoverCard>
    <HoverCardTrigger>
      <a href="https://github.com/segunadebayo" target="_blank" rel="noreferrer">
        <Avatar
          name="Segun Adebayo"
          src="https://avatars2.githubusercontent.com/u/6916170"
          size="11"
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
                  <Text as="span" textStyle="sm" fontWeight="semibold">
                    segunadebayo
                  </Text>
                  <Text as="span" textStyle="sm" color="fg.muted">
                    Segun Adebayo
                  </Text>
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
