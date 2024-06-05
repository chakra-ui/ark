import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseHoverCardReturn } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

interface RootProviderProps {
  children?: JSX.Element
  value: UseHoverCardReturn
}

export interface HoverCardRootProviderProps extends RootProviderProps, UsePresenceProps {}

export const HoverCardRootProvider = (props: HoverCardRootProviderProps) => {
  const [presenceProps, { value: hoverCard, children }] = splitPresenceProps(props)
  const presence = usePresence(mergeProps(presenceProps, () => ({ present: hoverCard().open })))

  return (
    <HoverCardProvider value={hoverCard}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </HoverCardProvider>
  )
}
