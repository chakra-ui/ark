import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import { Tooltip } from './tooltip'
import { TooltipArrow } from './tooltip-arrow'
import { TooltipArrowTip } from './tooltip-arrow-tip'
import { TooltipContent } from './tooltip-content'
import { TooltipPositioner } from './tooltip-positioner'
import { TooltipTrigger } from './tooltip-trigger'

const meta: Meta = {
  title: 'Tooltip',
}

export default meta

export const Basic = () => (
  <Tooltip openDelay={0} closeDelay={0}>
    <TooltipTrigger>Hover Me</TooltipTrigger>
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
