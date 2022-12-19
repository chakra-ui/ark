import {
  Portal,
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipProps,
  TooltipTrigger,
} from '@ark-ui/react'
import { tooltip } from '../../../panda/recipes'
import { Button } from '../shared/Button'

export const DemoTooltip = (props: Partial<TooltipProps>) => {
  return (
    <Tooltip openDelay={0} closeDelay={200} positioning={{ placement: 'top' }} {...props}>
      <TooltipTrigger>
        <Button size="sm" variant="tertiary">
          hover me
        </Button>
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
