import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipPresence,
  TooltipTrigger,
} from './'
import { TooltipContentWithPresence } from './tooltip-content'
import './tooltip.css'

type TooltipType = typeof Tooltip

const meta: Meta<TooltipType> = {
  title: 'Tooltip',
  component: Tooltip,
}

export default meta

export const Basic = () => (
  <Tooltip>
    <TooltipTrigger>Hover Me</TooltipTrigger>
    <Portal>
      <TooltipPositioner>
        <TooltipContentWithPresence>I am a tooltip!</TooltipContentWithPresence>
      </TooltipPositioner>
    </Portal>
  </Tooltip>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Tooltip open={isOpen}>
        <TooltipTrigger>Hover Me</TooltipTrigger>
        <Portal>
          <TooltipPositioner>
            <TooltipContent>I am a tooltip!</TooltipContent>
          </TooltipPositioner>
        </Portal>
      </Tooltip>
    </>
  )
}

export const RenderFn = () => (
  <Tooltip>
    {({ isOpen }) => (
      <>
        <TooltipTrigger>Hover Me</TooltipTrigger>
        <Portal>
          <TooltipPositioner>
            <TooltipContent>This tooltip is open: {isOpen.toString()}</TooltipContent>
          </TooltipPositioner>
        </Portal>
      </>
    )}
  </Tooltip>
)

export const Arrow = () => (
  <Tooltip>
    <TooltipTrigger>Hove Me</TooltipTrigger>
    <Portal>
      <TooltipPositioner>
        <TooltipArrow>
          <TooltipArrowTip />
        </TooltipArrow>
        <TooltipContent>I am a tooltip!</TooltipContent>
      </TooltipPositioner>
    </Portal>
  </Tooltip>
)

export const Animated = () => (
  <Tooltip>
    <TooltipTrigger>Hover Me</TooltipTrigger>
    <Portal>
      <TooltipPositioner>
        <TooltipPresence>
          <TooltipContent>I am a tooltip!</TooltipContent>
        </TooltipPresence>
      </TooltipPositioner>
    </Portal>
  </Tooltip>
)

export const Timings = () => (
  <Tooltip closeDelay={0} openDelay={0}>
    <TooltipTrigger>Hover Me</TooltipTrigger>
    <Portal>
      <TooltipPositioner>
        <TooltipContent>I am a tooltip!</TooltipContent>
      </TooltipPositioner>
    </Portal>
  </Tooltip>
)

export const Positioning = () => (
  <Tooltip
    positioning={{ placement: 'left-start', gutter: 16, offset: { mainAxis: 12, crossAxis: 12 } }}
  >
    <TooltipTrigger>Hover Me</TooltipTrigger>
    <Portal>
      <TooltipPositioner>
        <TooltipContent>I am a tooltip!</TooltipContent>
      </TooltipPositioner>
    </Portal>
  </Tooltip>
)
