import { panda } from '@/panda/jsx'
import { tooltip } from '@/panda/recipes'
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
  type TooltipProps,
} from '@ark-ui/react'

export type DemoTooltipProps = Partial<TooltipProps> & {
  placement?: NonNullable<TooltipProps['positioning']>['placement']
}

export const DemoTooltip = (props: DemoTooltipProps) => {
  const { placement = 'top', ...tooltipProps } = props
  return (
    <Tooltip openDelay={0} closeDelay={200} positioning={{ placement }} {...tooltipProps}>
      <TooltipTrigger asChild>
        <panda.span textStyle="sm" fontWeight="medium">
          Hover me
        </panda.span>
      </TooltipTrigger>
      <TooltipPositioner className={tooltip({})}>
        <TooltipArrow>
          <TooltipArrowTip />
        </TooltipArrow>
        <TooltipContent>My Tooltip</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  )
}
