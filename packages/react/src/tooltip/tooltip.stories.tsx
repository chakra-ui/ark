import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from './'

type TooltipType = typeof Tooltip

const meta: Meta<TooltipType> = {
  title: 'Tooltip',
  component: Tooltip,
}

export default meta

export const Basic = () => (
  <Tooltip openDelay={0} closeDelay={0}>
    <TooltipTrigger>hover me</TooltipTrigger>
    <Portal>
      <TooltipPositioner>
        <TooltipArrow>
          <TooltipArrowTip />
        </TooltipArrow>
        <TooltipContent>My Tooltip</TooltipContent>
      </TooltipPositioner>
    </Portal>
  </Tooltip>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Tooltip open={isOpen} openDelay={0} closeDelay={0}>
        <TooltipTrigger>hover me</TooltipTrigger>
        <Portal>
          <TooltipPositioner>
            <TooltipArrow>
              <TooltipArrowTip />
            </TooltipArrow>
            <TooltipContent>My Tooltip</TooltipContent>
          </TooltipPositioner>
        </Portal>
      </Tooltip>
    </>
  )
}

export const WithRenderFn = () => (
  <Tooltip openDelay={0} closeDelay={0}>
    {({ isOpen }) => (
      <>
        <TooltipTrigger>hover me</TooltipTrigger>
        <Portal>
          <TooltipPositioner>
            <TooltipArrow>
              <TooltipArrowTip />
            </TooltipArrow>
            <TooltipContent>IsOpen: {isOpen.toString()}</TooltipContent>
          </TooltipPositioner>
        </Portal>
      </>
    )}
  </Tooltip>
)
