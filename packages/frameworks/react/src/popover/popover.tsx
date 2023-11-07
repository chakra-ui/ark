import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { PopoverProvider, type PopoverContext } from './popover-context'
import { usePopover, type UsePopoverProps } from './use-popover'

export interface PopoverProps
  extends Assign<
      UsePopoverProps,
      { children?: ReactNode | ((props: PopoverContext) => ReactNode) }
    >,
    UsePresenceProps {}

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
