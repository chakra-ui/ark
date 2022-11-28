import type { JSX } from 'solid-js/jsx-runtime'
import { createSplitProps } from '../create-split-props'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, UseTooltipProps } from './use-tooltip'

export type TooltipProps = UseTooltipProps & { children: JSX.Element }

export const Tooltip = (props: TooltipProps) => {
  const [useTooltipProps, rest] = createSplitProps<UseTooltipProps>()(props, [
    'aria-label',
    'closeDelay',
    'closeOnEsc',
    'closeOnPointerDown',
    'disabled',
    'getRootNode',
    'ids',
    'id',
    'interactive',
    'onClose',
    'onOpen',
    'openDelay',
    'positioning',
  ])
  const tooltip = useTooltip(useTooltipProps)

  return <TooltipProvider value={tooltip} {...rest} />
}
