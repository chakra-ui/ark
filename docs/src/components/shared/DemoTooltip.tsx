import {
  Portal,
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '@ark-ui/react'
import { tooltip } from '../../../panda/recipes'

export const DemoTooltip = () => {
  return (
    <Tooltip openDelay={0} closeDelay={99999999} positioning={{ placement: 'right' }}>
      <TooltipTrigger>
        <span>hover me</span>
      </TooltipTrigger>
      <Portal>
        <TooltipPositioner className={tooltip({})}>
          <TooltipArrow>
            <TooltipArrowTip />
          </TooltipArrow>
          <TooltipContent>My Tooltip</TooltipContent>
        </TooltipPositioner>
      </Portal>
    </Tooltip>
  )
}
