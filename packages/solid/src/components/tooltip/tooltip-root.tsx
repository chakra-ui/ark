import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseTooltipProps, useTooltip } from './use-tooltip'
import { TooltipProvider } from './use-tooltip-context'

export interface TooltipRootBaseProps extends UseTooltipProps, UsePresenceProps {}
export interface TooltipRootProps extends TooltipRootBaseProps {
  children?: JSX.Element
}
export const TooltipRoot = (props: TooltipRootProps) => {
  const [presenceProps, tooltipProps] = splitPresenceProps(props)
  const [useTooltipProps, localProps] = createSplitProps<UseTooltipProps>()(tooltipProps, [
    'aria-label',
    'closeDelay',
    'closeOnEscape',
    'closeOnPointerDown',
    'closeOnScroll',
    'defaultOpen',
    'disabled',
    'id',
    'ids',
    'interactive',
    'onOpenChange',
    'open',
    'openDelay',
    'positioning',
  ])

  const api = useTooltip(useTooltipProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().open })))

  return (
    <TooltipProvider value={api}>
      <PresenceProvider value={apiPresence}>{localProps.children}</PresenceProvider>
    </TooltipProvider>
  )
}
