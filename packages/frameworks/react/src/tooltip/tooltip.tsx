import { type PropsWithChildren, type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { TooltipProvider, type TooltipContext } from './tooltip-context'
import { useTooltip, type UseTooltipProps } from './use-tooltip'

export type TooltipProps = Assign<
  PropsWithChildren<UseTooltipProps>,
  {
    children?: ReactNode | ((props: TooltipContext) => ReactNode)
  }
>

export const Tooltip = (props: TooltipProps) => {
  const { children, ...useTooltipProps } = props
  const tooltip = useTooltip(useTooltipProps)
  const view = runIfFn(children, tooltip)

  return <TooltipProvider value={tooltip}>{view}</TooltipProvider>
}
