import { Tooltip } from './tooltip'
import { TooltipArrow } from './tooltip-arrow'
import { TooltipContent } from './tooltip-content'
import { TooltipInnerArrow } from './tooltip-inner-arrow'
import { TooltipPortal } from './tooltip-portal'
import { TooltipPositioner } from './tooltip-positioner'
import { TooltipTrigger } from './tooltip-trigger'

export const Basic = () => (
  <Tooltip openDelay={0} closeDelay={0}>
    <TooltipTrigger>
      <span>Hover me</span>
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipPositioner>
        <TooltipArrow>
          <TooltipInnerArrow />
        </TooltipArrow>
        <TooltipContent>My Tooltip</TooltipContent>
      </TooltipPositioner>
    </TooltipPortal>
  </Tooltip>
)
