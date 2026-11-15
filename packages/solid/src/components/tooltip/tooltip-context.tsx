import type { JSX } from '@solidjs/web'
import { type UseTooltipContext, useTooltipContext } from './use-tooltip-context.ts'

export interface TooltipContextProps {
  children: (context: UseTooltipContext) => JSX.Element
}

export const TooltipContext = (props: TooltipContextProps) => props.children(useTooltipContext())
