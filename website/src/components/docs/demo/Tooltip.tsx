import { styled } from '@/panda/jsx'
import { tooltip } from '@/panda/recipes'
import {
  Portal,
  Tooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
  type TooltipProps,
} from '@ark-ui/react'

export type DemoTooltipProps = Partial<TooltipProps> & {
  placement?: NonNullable<TooltipProps['positioning']>['placement']
}

export const DemoTooltip = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <styled.span textStyle="sm" fontWeight="medium">
        Hover me
      </styled.span>
    </TooltipTrigger>
    <Portal>
      <TooltipPositioner className={tooltip({})}>
        <TooltipContent>I am a Tooltip!</TooltipContent>
      </TooltipPositioner>
    </Portal>
  </Tooltip>
)
