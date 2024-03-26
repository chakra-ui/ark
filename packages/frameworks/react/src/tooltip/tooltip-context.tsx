import type { ReactNode } from 'react'
import { useTooltipContext, type UseTooltipContext } from './use-tooltip-context'

export interface TooltipContextProps {
  children: (context: UseTooltipContext) => ReactNode
}

export const TooltipContext = (props: TooltipContextProps) => props.children(useTooltipContext())
