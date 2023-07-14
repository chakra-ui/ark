import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
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
  PopoverPresence,
  PopoverTitle,
  PopoverTrigger,
} from './'
import './popover.css'

type PopoverType = typeof Popover

const meta: Meta<PopoverType> = {
  title: 'Popover',
  component: Popover,
}

export default meta

export const Basic = () => (
  <Popover>
    <PopoverTrigger>Click Me</PopoverTrigger>
    <Portal>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description</PopoverDescription>
          <PopoverCloseTrigger>Close</PopoverCloseTrigger>
        </PopoverContent>
      </PopoverPositioner>
    </Portal>
  </Popover>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Popover open={isOpen}>
        <PopoverAnchor>Anchor</PopoverAnchor>
        <Portal>
          <PopoverPositioner>
            <PopoverContent>
              <PopoverTitle>Title</PopoverTitle>
              <PopoverDescription>Description</PopoverDescription>
              <PopoverCloseTrigger>Close</PopoverCloseTrigger>
            </PopoverContent>
          </PopoverPositioner>
        </Portal>
      </Popover>
    </>
  )
}

export const RenderFn = () => (
  <Popover>
    {({ isOpen }) => (
      <>
        <PopoverTrigger>Click Me</PopoverTrigger>
        <Portal>
          <PopoverPositioner>
            <PopoverContent>
              <PopoverTitle>Title</PopoverTitle>
              <PopoverDescription>Description: {isOpen.toString()}</PopoverDescription>
              <PopoverCloseTrigger>Close</PopoverCloseTrigger>
            </PopoverContent>
          </PopoverPositioner>
        </Portal>
      </>
    )}
  </Popover>
)

export const Arrow = () => (
  <Popover>
    <PopoverTrigger>Click Me</PopoverTrigger>
    <Portal>
      <PopoverPositioner>
        <PopoverArrow>
          <PopoverArrowTip />
        </PopoverArrow>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description</PopoverDescription>
          <PopoverCloseTrigger>Close</PopoverCloseTrigger>
        </PopoverContent>
      </PopoverPositioner>
    </Portal>
  </Popover>
)

export const Animated = () => (
  <Popover>
    <PopoverTrigger>Click Me</PopoverTrigger>
    <Portal>
      <PopoverPositioner>
        <PopoverPresence>
          <PopoverContent>
            <PopoverTitle>Title</PopoverTitle>
            <PopoverDescription>Description</PopoverDescription>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </PopoverContent>
        </PopoverPresence>
      </PopoverPositioner>
    </Portal>
  </Popover>
)

export const Positioning = () => (
  <Popover
    positioning={{ placement: 'left-start', gutter: 16, offset: { mainAxis: 12, crossAxis: 12 } }}
  >
    <PopoverTrigger>Click Me</PopoverTrigger>
    <Portal>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description</PopoverDescription>
          <PopoverCloseTrigger>Close</PopoverCloseTrigger>
        </PopoverContent>
      </PopoverPositioner>
    </Portal>
  </Popover>
)

export const CloseBehavior = () => (
  <Popover closeOnEsc closeOnInteractOutside>
    <PopoverTrigger>Click Me</PopoverTrigger>
    <Portal>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription>Description</PopoverDescription>
          <PopoverCloseTrigger>Close</PopoverCloseTrigger>
        </PopoverContent>
      </PopoverPositioner>
    </Portal>
  </Popover>
)
