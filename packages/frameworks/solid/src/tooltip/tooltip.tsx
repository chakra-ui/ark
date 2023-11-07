import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, type UseTooltipProps, type UseTooltipReturn } from './use-tooltip'

export interface TooltipProps extends UseTooltipProps, UsePresenceProps {
  children?: JSX.Element | ((api: UseTooltipReturn) => JSX.Element)
}

export const Tooltip = (props: TooltipProps) => {
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
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <TooltipProvider value={api}>
      <PresenceProvider value={apiPresence}>{getChildren()}</PresenceProvider>
    </TooltipProvider>
  )
}
