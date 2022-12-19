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
import { Button } from '../shared/Button'

export const DemoTooltip = () => {
  return (
    <Tooltip openDelay={0} closeDelay={200} positioning={{ placement: 'bottom' }}>
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
