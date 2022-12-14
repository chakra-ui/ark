import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipInnerArrow,
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
        <TooltipPositioner>
          <TooltipArrow>
            <TooltipInnerArrow />
          </TooltipArrow>
          <TooltipContent class={tooltip({})}>My Tooltip</TooltipContent>
        </TooltipPositioner>
      </Portal>
    </Tooltip>
  )
}
