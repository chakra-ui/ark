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
import { HoverCardProvider } from './hover-card-context'
import { useHoverCard, type UseHoverCardProps, type UseHoverCardReturn } from './use-hover-card'

export interface HoverCardRootProps extends UseHoverCardProps, UsePresenceProps {
  children?: JSX.Element | ((api: UseHoverCardReturn) => JSX.Element)
}
export const HoverCardRoot = (props: HoverCardRootProps) => {
  const [presenceProps, hoverCardProps] = splitPresenceProps(props)
  const [useHoverCardProps, localProps] = createSplitProps<UseHoverCardProps>()(hoverCardProps, [
    'closeDelay',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'onOpenChange',
    'open',
    'open.controlled',
    'openDelay',
    'positioning',
  ])
  const api = useHoverCard(useHoverCardProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <HoverCardProvider value={api}>
      <PresenceProvider value={apiPresence}>{getChildren()}</PresenceProvider>
    </HoverCardProvider>
  )
}
