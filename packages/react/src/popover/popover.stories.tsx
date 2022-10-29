import { Meta } from '@storybook/react'
import { Popover } from './popover'
import { PopoverArrow } from './popover-arrow'
import { PopoverCloseButton } from './popover-close-button'
import { PopoverContent } from './popover-content'
import { PopoverDescription } from './popover-description'
import { PopoverInnerArrow } from './popover-inner-arrow'
import { PopoverPositioner } from './popover-positioner'
import { PopoverTitle } from './popover-title'
import { PopoverTrigger } from './popover-trigger'

export default {
  title: 'React/Popover',
} as Meta

export const basic = () => (
  <Popover>
    <PopoverTrigger>
      <button>click me</button>
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverArrow>
        <PopoverInnerArrow />
      </PopoverArrow>
      <PopoverContent>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverDescription>Description</PopoverDescription>
        <input type="text" />
        <PopoverCloseButton>close</PopoverCloseButton>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
)
