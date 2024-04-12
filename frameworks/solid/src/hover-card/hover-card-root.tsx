import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { useHoverCard, type UseHoverCardProps } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

export interface HoverCardRootProps extends UseHoverCardProps, UsePresenceProps {
  children?: JSX.Element
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
    'openDelay',
    'positioning',
  ])
  const api = useHoverCard(useHoverCardProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))

  return (
    <HoverCardProvider value={api}>
      <PresenceProvider value={apiPresence}>{localProps.children}</PresenceProvider>
    </HoverCardProvider>
  )
}
