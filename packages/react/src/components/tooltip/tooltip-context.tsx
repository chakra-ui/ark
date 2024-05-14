import type { ReactNode } from 'react'
import { type UseTooltipContext, useTooltipContext } from './use-tooltip-context'

export interface TooltipContextProps {
  children: (context: UseTooltipContext) => ReactNode
}

export const TooltipContext = (props: TooltipContextProps) => props.children(useTooltipContext())
