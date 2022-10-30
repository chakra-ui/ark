import {
  Tooltip,
  TooltipTrigger,
  TooltipPositioner,
  TooltipArrow,
  TooltipInnerArrow,
  TooltipContent,
} from '@atlas/react'

export const ReactTooltip = () => (
  <Tooltip>
    <TooltipTrigger>hover me</TooltipTrigger>
    <TooltipPositioner>
      <TooltipArrow>
        <TooltipInnerArrow />
      </TooltipArrow>
      <TooltipContent>My Tooltip</TooltipContent>
    </TooltipPositioner>
  </Tooltip>
)
