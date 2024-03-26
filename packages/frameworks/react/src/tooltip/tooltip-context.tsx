import { useTooltipContext, type UseTooltipContext } from './use-tooltip-context'

export interface TooltipContextProps {
  children: (context: UseTooltipContext) => React.ReactNode
}

export const TooltipContext = (props: TooltipContextProps) => props.children(useTooltipContext())
