import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UsePopoverReturn } from './use-popover'
import { PopoverProvider } from './use-popover-context'

interface RootProviderProps {
  children?: JSX.Element
  value: UsePopoverReturn
}

export interface PopoverRootProviderProps extends RootProviderProps, UsePresenceProps {}

export const PopoverRootProvider = (props: PopoverRootProviderProps) => {
  const [presenceProps, { value: popover, children }] = splitPresenceProps(props)
  const presence = usePresence(mergeProps(presenceProps, () => ({ present: popover().open })))

  return (
    <PopoverProvider value={popover}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </PopoverProvider>
  )
}
