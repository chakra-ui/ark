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

export interface TooltipRootProps extends UseTooltipProps, UsePresenceProps {
  children?: JSX.Element
}

export const TooltipRoot = (props: TooltipRootProps) => {
  const [presenceProps, tooltipProps] = splitPresenceProps(props)
  const [useTooltipProps, localProps] = createSplitProps<UseTooltipProps>()(tooltipProps, [
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

  const api = useTooltip(useTooltipProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))

  return (
    <TooltipProvider value={api}>
      <PresenceProvider value={apiPresence}>{localProps.children}</PresenceProvider>
    </TooltipProvider>
  )
}
