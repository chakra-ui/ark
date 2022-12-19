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

export type DemoTooltipProps = Partial<TooltipProps> & {
  placement?: NonNullable<TooltipProps['positioning']>['placement']
}

export const DemoTooltip = (props: DemoTooltipProps) => {
  const { placement = 'top', ...tooltipProps } = props
  return (
    <Tooltip openDelay={0} closeDelay={200} positioning={{ placement }} {...tooltipProps}>
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
