import { Portal } from '@ark-ui/react'
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '~/components/ui/tooltip'

export const TooltipDemo = () => (
  <Tooltip>
    <TooltipTrigger>Hover Me</TooltipTrigger>
    <Portal>
      <TooltipPositioner>
        <TooltipArrow>
          <TooltipArrowTip />
        </TooltipArrow>
        <TooltipContent>I am a Tooltip!</TooltipContent>
      </TooltipPositioner>
    </Portal>
  </Tooltip>
)
