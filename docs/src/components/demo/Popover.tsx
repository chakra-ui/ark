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
} from '@ark-ui/react'
import { Stack } from '../../../panda/jsx'
import { popover } from '../../../panda/recipes'
import { Button } from '../shared/Button'
import { Input } from '../shared/Input'
import { Link } from '../shared/Link'

export const DemoPopover = () => (
  <Popover>
    <PopoverTrigger>
      <Button variant="secondary" size="md">
        Open
      </Button>
    </PopoverTrigger>
    <PopoverPositioner className={popover()}>
      <PopoverArrow>
        <PopoverArrowTip />
      </PopoverArrow>
      <PopoverContent>
        <Stack gap="4">
          <Stack gap="1">
            <PopoverTitle>Favorite Cake</PopoverTitle>
            <PopoverDescription>
              Dessert jelly beans pudding chocolate pie pastry danish chocolate pie.
            </PopoverDescription>
          </Stack>
          <Input variant="outline" size="sm" />
          <Stack direction="row" gap="3">
            <PopoverCloseTrigger>
              <Link textStyle="sm" color="fg.muted" fontWeight="semibold">
                Cancel
              </Link>
            </PopoverCloseTrigger>
            <Link textStyle="sm" color="accent.default" fontWeight="semibold">
              Submit
            </Link>
          </Stack>
        </Stack>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
)
