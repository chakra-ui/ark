import type { Meta } from '@storybook/react'
import { Tooltip } from './tooltip'
import { TooltipArrow } from './tooltip-arrow'
import { TooltipContent } from './tooltip-content'
import { TooltipInnerArrow } from './tooltip-inner-arrow'
import { TooltipPositioner } from './tooltip-positioner'
import { TooltipTrigger } from './tooltip-trigger'

export default {
  title: 'React/Tooltip',
} as Meta

export const basic = () => (
  <Tooltip>
    <TooltipTrigger>
      <button>hover</button>
    </TooltipTrigger>
    <TooltipPositioner>
      <TooltipArrow>
        <TooltipInnerArrow />
      </TooltipArrow>
      <TooltipContent>My Tooltip</TooltipContent>
    </TooltipPositioner>
  </Tooltip>
)
