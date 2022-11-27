import type { JSX } from 'solid-js/jsx-runtime'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, UseTooltipProps } from './use-tooltip'

export type TooltipProps = UseTooltipProps & { children?: JSX.Element }

export const Tooltip = (props: TooltipProps) => {
  const { children, ...useTooltipProps } = props
  const tooltip = useTooltip(useTooltipProps)

  return <TooltipProvider value={tooltip}>{children}</TooltipProvider>
}
