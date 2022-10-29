import { Meta } from '@storybook/react'
import { Tooltip } from './tooltip'
import { TooltipContent } from './tooltip-content'
import { TooltipPositioner } from './tooltip-positioner'
import { TooltipTrigger } from './tooltip-trigger'

export default {
  title: 'React/Tooltip',
} as Meta

export const basic = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <button>hover</button>
      </TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent>My Tooltip</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  )
}
