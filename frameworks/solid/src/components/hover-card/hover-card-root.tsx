import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseHoverCardProps, useHoverCard } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

export interface HoverCardRootProps extends UseHoverCardProps, UsePresenceProps {
  children?: JSX.Element
}
export const HoverCardRoot = (props: HoverCardRootProps) => {
  const [presenceProps, hoverCardProps] = splitPresenceProps(props)
  const [useHoverCardProps, localProps] = createSplitProps<UseHoverCardProps>()(hoverCardProps, [
    'closeDelay',
    'id',
    'ids',
    'onOpenChange',
    'open',
    'openDelay',
    'positioning',
  ])
  const api = useHoverCard(useHoverCardProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().open })))

  return (
    <HoverCardProvider value={api}>
      <PresenceProvider value={apiPresence}>{localProps.children}</PresenceProvider>
    </HoverCardProvider>
  )
}
