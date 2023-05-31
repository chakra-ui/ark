import { type JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, type UseTooltipProps } from './use-tooltip'

export type TooltipProps = UseTooltipProps & { children: JSX.Element }

export const Tooltip = (props: TooltipProps) => {
  const [useTooltipProps, restProps] = createSplitProps<UseTooltipProps>()(props, [
    'aria-label',
    'closeDelay',
    'closeOnEsc',
    'closeOnPointerDown',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'interactive',
    'onClose',
    'onOpen',
    'open',
    'openDelay',
    'positioning',
  ])

  const api = useTooltip(useTooltipProps)

  return <TooltipProvider value={api} {...restProps} />
}
