import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { usePopover, type UsePopoverProps } from './use-popover'
import { PopoverProvider } from './use-popover-context'

export interface PopoverRootProps extends UsePopoverProps, UsePresenceProps {
  children?: ReactNode
}

export const PopoverRoot = (props: PopoverRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const context = usePopover(localProps)
  const presenceApi = usePresence(mergeProps({ present: context.isOpen }, presenceProps))

  return (
    <PopoverProvider value={context}>
      <PresenceProvider value={presenceApi}>{children}</PresenceProvider>
    </PopoverProvider>
  )
}
