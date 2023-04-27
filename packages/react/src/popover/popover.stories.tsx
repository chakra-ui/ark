import type { Meta } from '@storybook/react'
import { useState } from 'react'
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from './'

type PopoverType = typeof Popover

const meta: Meta<PopoverType> = {
  title: 'Popover',
  component: Popover,
}

export default meta

export const Basic = () => (
  <Popover>
    <PopoverTrigger>
      <button>click me</button>
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverArrow>
        <PopoverArrowTip />
      </PopoverArrow>
      <PopoverContent>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverDescription>Description</PopoverDescription>
        <input type="text" />
        <PopoverCloseTrigger>
          <button>close</button>
        </PopoverCloseTrigger>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen((prev) => !prev)}>click me</button>
      <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PopoverAnchor>
          <span>anchor</span>
        </PopoverAnchor>
        <PopoverPositioner>
          <PopoverArrow>
            <PopoverArrowTip />
          </PopoverArrow>
          <PopoverContent>
            <PopoverTitle>Title</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
            <input type="text" />
            <PopoverCloseTrigger>
              <button>close</button>
            </PopoverCloseTrigger>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </>
  )
}
