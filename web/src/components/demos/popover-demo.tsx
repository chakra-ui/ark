import { Portal } from '@ark-ui/react'
import { FiX } from 'react-icons/fi'
import { Box, Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import { IconButton } from '~/components/ui/icon-button'
import {
  Popover,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  type PopoverProps,
} from '~/components/ui/popover'

export const PopoverDemo = (props: PopoverProps) => (
  <Popover portalled {...props}>
    <PopoverTrigger asChild>
      <Button variant="secondary">Open Popover</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverArrow>
            <PopoverArrowTip />
          </PopoverArrow>
          <Stack gap="1">
            <PopoverTitle>Favorite Framework</PopoverTitle>
            <PopoverDescription>
              Tell us what is your favorite framework and why you love to use it.
            </PopoverDescription>
          </Stack>
          <Box position="absolute" top="1" right="1">
            <PopoverCloseTrigger asChild>
              <IconButton aria-label="Close Popover" variant="tertiary" size="sm">
                <FiX />
              </IconButton>
            </PopoverCloseTrigger>
          </Box>
        </PopoverContent>
      </PopoverPositioner>
    </Portal>
  </Popover>
)
