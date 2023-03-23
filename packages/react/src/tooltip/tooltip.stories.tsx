import { Portal } from '@zag-js/react'
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from './'

export const Basic = () => (
  <Tooltip openDelay={0} closeDelay={0}>
    <TooltipTrigger>
      <span>hover me</span>
    </TooltipTrigger>
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

export const WithRenderFn = () => (
  <Tooltip openDelay={0} closeDelay={0}>
    {({ isOpen }) => (
      <>
        <TooltipTrigger>
          <span>hover me</span>
        </TooltipTrigger>
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
