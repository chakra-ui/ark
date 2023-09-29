import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { useState } from 'react'
import { Popover } from './'
import { PopoverIndicator } from './popover-indicator'
import './popover.css'

type PopoverType = typeof Popover

const meta: Meta<PopoverType> = {
  title: 'Popover',
  component: Popover,
}

export default meta

export const Basic = () => (
  <Popover.Root>
    <Popover.Trigger>
      Click Me <PopoverIndicator>Indicator</PopoverIndicator>
    </Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Popover.Root open={isOpen}>
        <Popover.Anchor>Anchor</Popover.Anchor>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Title>Title</Popover.Title>
              <Popover.Description>Description</Popover.Description>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </>
  )
}

export const RenderFn = () => (
  <Popover.Root>
    {({ isOpen }) => (
      <>
        <Popover.Trigger>Click Me</Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Title>Title</Popover.Title>
              <Popover.Description>Description: {isOpen.toString()}</Popover.Description>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </>
    )}
  </Popover.Root>
)

export const Arrow = () => (
  <Popover.Root>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

export const Positioning = () => (
  <Popover.Root
    positioning={{ placement: 'left-start', gutter: 16, offset: { mainAxis: 12, crossAxis: 12 } }}
  >
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

export const CloseBehavior = () => (
  <Popover.Root closeOnEsc closeOnInteractOutside>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
