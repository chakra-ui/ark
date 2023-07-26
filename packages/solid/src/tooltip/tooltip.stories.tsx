import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from './'
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
        <TooltipContent>I am a tooltip!</TooltipContent>
      </TooltipPositioner>
    </Portal>
  </Tooltip>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = createSignal(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Tooltip open={isOpen()}>
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
