import { type PropsWithChildren } from 'react'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, type UseTooltipProps } from './use-tooltip'

export type TooltipProps = PropsWithChildren<UseTooltipProps>

export const Tooltip = (props: TooltipProps) => {
  const { children, ...useTooltipProps } = props
  const tooltip = useTooltip(useTooltipProps)

  return <TooltipProvider value={tooltip}>{children}</TooltipProvider>
}
