import { Portal } from 'solid-js/web'
import { Tooltip } from './tooltip'
import { TooltipArrow } from './tooltip-arrow'
import { TooltipArrowTip } from './tooltip-arrow-tip'
import { TooltipContent } from './tooltip-content'
import { TooltipPositioner } from './tooltip-positioner'
import { TooltipTrigger } from './tooltip-trigger'

export const Basic = () => (
  <Tooltip openDelay={0} closeDelay={0}>
    <TooltipTrigger>
      <span>Hover me</span>
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
