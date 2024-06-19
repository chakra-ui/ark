import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import type { UsePopoverReturn } from './use-popover'
import { PopoverProvider } from './use-popover-context'

interface RootProviderProps {
  value: UsePopoverReturn
}

export interface PopoverRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface PopoverRootProviderProps extends PopoverRootProviderBaseProps {
  children?: ReactNode
}

export const PopoverRootProvider = (props: PopoverRootProviderProps) => {
  const [presenceProps, { value: popover, children }] = splitPresenceProps(props)
  const presence = usePresence(mergeProps({ present: popover.open }, presenceProps))

  return (
    <PopoverProvider value={popover}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </PopoverProvider>
  )
}
