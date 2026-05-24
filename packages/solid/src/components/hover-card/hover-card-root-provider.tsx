import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.tsx'
import type { UseHoverCardReturn } from './use-hover-card.ts'
import { HoverCardProvider } from './use-hover-card-context.ts'

interface RootProviderProps {
  value: UseHoverCardReturn
}

export interface HoverCardRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface HoverCardRootProviderProps extends HoverCardRootProviderBaseProps {
  children?: JSX.Element
}

export const HoverCardRootProvider = (props: HoverCardRootProviderProps) => {
  const [presenceProps, hoverCardProps] = splitPresenceProps(props)
  const presence = usePresence(mergeProps(presenceProps, () => ({ present: hoverCardProps.value().open })))

  return (
    <HoverCardProvider value={hoverCardProps.value}>
      <PresenceProvider value={presence}>{hoverCardProps.children}</PresenceProvider>
    </HoverCardProvider>
  )
}
