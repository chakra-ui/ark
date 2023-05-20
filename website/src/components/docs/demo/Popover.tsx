import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { Stack } from '@/panda/jsx'
import { popover } from '@/panda/recipes'
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
} from '@ark-ui/react'

export const DemoPopover = (props: Partial<PopoverProps>) => (
  <Popover {...props}>
    <PopoverTrigger asChild>
      <Button variant="secondary" size="md">
        Open
      </Button>
    </PopoverTrigger>
    <PopoverPositioner className={popover()}>
      <PopoverContent>
        <PopoverArrow>
          <PopoverArrowTip />
        </PopoverArrow>
        <Stack gap="4">
          <Stack gap="1">
            <PopoverTitle>Favorite Cake</PopoverTitle>
            <PopoverDescription>
              Dessert jelly beans pudding chocolate pie pastry danish chocolate pie.
            </PopoverDescription>
          </Stack>
          <Input variant="outline" size="sm" />
          <Stack direction="row" gap="3">
            <PopoverCloseTrigger asChild>
              <Button variant="link" size="sm">
                Dismiss
              </Button>
            </PopoverCloseTrigger>
            <Button variant="link" size="sm" color="accent.default">
              Show
            </Button>
          </Stack>
        </Stack>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
)
