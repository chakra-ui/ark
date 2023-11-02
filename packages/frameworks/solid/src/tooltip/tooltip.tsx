import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, type UseTooltipProps, type UseTooltipReturn } from './use-tooltip'

export type TooltipProps = UseTooltipProps & {
  children: JSX.Element | ((api: UseTooltipReturn) => JSX.Element)
}

export const Tooltip = (props: TooltipProps) => {
  const [tooltipProps, localProps] = createSplitProps<UseTooltipProps>()(props, [
    'aria-label',
    'closeDelay',
    'closeOnEsc',
    'closeOnPointerDown',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'interactive',
    'onOpenChange',
    'open',
    'openDelay',
    'positioning',
  ])

  const api = useTooltip(tooltipProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return <TooltipProvider value={api}>{getChildren()}</TooltipProvider>
}
