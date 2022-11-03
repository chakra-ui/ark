import { Tooltip } from './tooltip'
import { TooltipArrow } from './tooltip-arrow'
import { TooltipContent } from './tooltip-content'
import { TooltipInnerArrow } from './tooltip-inner-arrow'
import { TooltipPositioner } from './tooltip-positioner'
import { TooltipTrigger } from './tooltip-trigger'

export const Basic = () => (
  <Tooltip openDelay={0} closeDelay={0}>
    <TooltipTrigger>hover me</TooltipTrigger>
    <TooltipPositioner>
      <TooltipArrow>
        <TooltipInnerArrow />
      </TooltipArrow>
      <TooltipContent>My Tooltip</TooltipContent>
    </TooltipPositioner>
  </Tooltip>
)
