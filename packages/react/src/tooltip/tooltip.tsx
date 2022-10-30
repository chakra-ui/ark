import type { PropsWithChildren } from 'react'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, UseTooltipProps } from './use-tooltip'

export type TooltipProps = PropsWithChildren<UseTooltipProps>

export const Tooltip = (props: TooltipProps) => {
  const { children, ...tooltipProps } = props
  const { api } = useTooltip(tooltipProps)
  return <TooltipProvider value={api}>{children}</TooltipProvider>
}
