import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '@ark-ui/solid'
import { Portal } from 'solid-js/web'
import { tooltip } from '../../../panda/recipes'

export const DemoTooltip = () => {
  return (
    <Tooltip openDelay={0} closeDelay={999999} positioning={{ placement: 'right' }}>
      <TooltipTrigger>
        <span>hover me</span>
      </TooltipTrigger>
      <Portal>
        <TooltipPositioner class={tooltip({})}>
          <TooltipArrow>
            <TooltipArrowTip />
          </TooltipArrow>
          <TooltipContent>My Tooltip</TooltipContent>
        </TooltipPositioner>
      </Portal>
    </Tooltip>
  )
}
