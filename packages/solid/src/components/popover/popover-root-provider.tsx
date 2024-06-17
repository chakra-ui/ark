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
  value: UsePopoverReturn
}

export interface PopoverRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface PopoverRootProviderProps extends PopoverRootProviderBaseProps {
  children?: JSX.Element
}

export const PopoverRootProvider = (props: PopoverRootProviderProps) => {
  const [presenceProps, popoverProps] = splitPresenceProps(props)
  const presence = usePresence(
    mergeProps(presenceProps, () => ({ present: popoverProps.value().open })),
  )

  return (
    <PopoverProvider value={popoverProps.value}>
      <PresenceProvider value={presence}>{popoverProps.children}</PresenceProvider>
    </PopoverProvider>
  )
}
