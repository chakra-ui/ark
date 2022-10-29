import { PropsWithChildren } from 'react'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, UseTooltipProps } from './use-tooltip'

export type TooltipProps = PropsWithChildren<UseTooltipProps>

export const Tooltip = (props: TooltipProps) => {
  const { children } = props
  const { api } = useTooltip(props)
  return <TooltipProvider value={api}>{children}</TooltipProvider>
}
