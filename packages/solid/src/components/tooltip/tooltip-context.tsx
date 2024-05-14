import type { JSX } from 'solid-js'
import { type UseTooltipContext, useTooltipContext } from './use-tooltip-context'

export interface TooltipContextProps {
  children: (context: UseTooltipContext) => JSX.Element
}

export const TooltipContext = (props: TooltipContextProps) => props.children(useTooltipContext())
