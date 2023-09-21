import { type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { TooltipProvider, type TooltipContext } from './tooltip-context'
import { useTooltip, type UseTooltipProps } from './use-tooltip'

export interface TooltipProps extends UseTooltipProps {
  children?: ReactNode | ((props: TooltipContext) => ReactNode)
}

export const Tooltip = (props: TooltipProps) => {
  const { children, ...useTooltipProps } = props
  const api = useTooltip(useTooltipProps)
  const view = runIfFn(children, api)

  return <TooltipProvider value={api}>{view}</TooltipProvider>
}
