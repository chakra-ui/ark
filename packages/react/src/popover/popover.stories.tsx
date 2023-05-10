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
    <PopoverTrigger>click me</PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverArrow>
          <PopoverArrowTip />
        </PopoverArrow>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverDescription>Description</PopoverDescription>
        <input type="text" />
        <PopoverCloseTrigger>close</PopoverCloseTrigger>
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
        <PopoverAnchor>anchor</PopoverAnchor>
        <PopoverPositioner>
          <PopoverContent>
            <PopoverArrow>
              <PopoverArrowTip />
            </PopoverArrow>
            <PopoverTitle>Title</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
            <input type="text" />
            <PopoverCloseTrigger>close</PopoverCloseTrigger>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </>
  )
}
