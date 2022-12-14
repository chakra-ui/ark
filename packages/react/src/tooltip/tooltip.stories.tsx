import { Portal } from '@zag-js/react'
import { Tooltip } from './tooltip'
import { TooltipArrow } from './tooltip-arrow'
import { TooltipArrowTip } from './tooltip-arrow-tip'
import { TooltipContent } from './tooltip-content'
import { TooltipPositioner } from './tooltip-positioner'
import { TooltipTrigger } from './tooltip-trigger'

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
