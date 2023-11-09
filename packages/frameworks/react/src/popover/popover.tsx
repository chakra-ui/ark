import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { runIfFn } from '../run-if-fn'
import { PopoverProvider } from './popover-context'
import { usePopover, type UsePopoverProps, type UsePopoverReturn } from './use-popover'

export interface PopoverProps extends UsePopoverProps, UsePresenceProps {
  children?: ReactNode | ((api: UsePopoverReturn) => ReactNode)
}

export const Popover = (props: PopoverProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const api = usePopover(localProps)
  const presenceApi = usePresence({ ...presenceProps, present: api.isOpen })
  const view = runIfFn(children, api)

  return (
    <PopoverProvider value={api}>
      <PresenceProvider value={presenceApi}>{view}</PresenceProvider>
    </PopoverProvider>
  )
}
