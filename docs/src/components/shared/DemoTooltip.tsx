import {
  Portal,
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '@ark-ui/react'

export const DemoTooltip = () => {
  return (
    <Tooltip openDelay={0} closeDelay={999999} positioning={{ placement: 'right' }}>
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
}
