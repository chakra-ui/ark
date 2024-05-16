import { XIcon } from 'lucide-react'
import { Box, Stack } from 'styled-system/jsx'
import { Button, IconButton, Popover } from '~/components/ui'

export const Demo = (props: Popover.RootProps) => (
  <Popover.Root {...props}>
    <Popover.Trigger asChild>
      <Button variant="outline">Open Popover</Button>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Stack gap="1">
          <Popover.Title>Favorite Framework</Popover.Title>
          <Popover.Description>
            Tell us what is your favorite framework and why you love to use it.
          </Popover.Description>
        </Stack>
        <Box position="absolute" top="1" right="1">
          <Popover.CloseTrigger asChild>
            <IconButton aria-label="Close Popover" variant="ghost" size="sm">
              <XIcon />
            </IconButton>
          </Popover.CloseTrigger>
        </Box>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
