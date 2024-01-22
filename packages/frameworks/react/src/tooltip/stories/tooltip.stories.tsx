import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Tooltip } from '../'
import './tooltip.css'

const meta: Meta = {
  title: 'Tooltip',
}

export default meta

export const Basic = () => (
  <Tooltip.Root lazyMount unmountOnExit>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Tooltip.Root open={isOpen}>
        <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </>
  )
}

export const RenderFn = () => (
  <Tooltip.Root>
    {({ isOpen }) => (
      <>
        <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>This tooltip is open: {isOpen.toString()}</Tooltip.Content>
        </Tooltip.Positioner>
      </>
    )}
  </Tooltip.Root>
)

export const Arrow = () => (
  <Tooltip.Root>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>
        <Tooltip.Arrow>
          <Tooltip.ArrowTip />
        </Tooltip.Arrow>
        I am a tooltip!
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)

export const Timings = () => (
  <Tooltip.Root closeDelay={0} openDelay={0}>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)

export const Positioning = () => (
  <Tooltip.Root
    positioning={{ placement: 'left-start', gutter: 16, offset: { mainAxis: 12, crossAxis: 12 } }}
  >
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)
