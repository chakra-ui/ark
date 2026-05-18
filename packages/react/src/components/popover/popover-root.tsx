'use client'

import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from '../presence/index.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { splitPresenceProps } from '../presence/split-presence-props.ts'
import { type UsePopoverProps, usePopover } from './use-popover.ts'
import { PopoverProvider } from './use-popover-context.ts'

export interface PopoverRootBaseProps extends UsePopoverProps, UsePresenceProps {}
export interface PopoverRootProps extends PopoverRootBaseProps {
  children?: ReactNode | undefined
}

export const PopoverRoot = (props: PopoverRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const popover = usePopover(localProps)
  const presence = usePresence(mergeProps({ present: popover.open }, presenceProps))

  return (
    <PopoverProvider value={popover}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </PopoverProvider>
  )
}
