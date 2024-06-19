import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UsePopoverProps, usePopover } from './use-popover'
import { PopoverProvider } from './use-popover-context'

export interface PopoverRootBaseProps extends UsePopoverProps, UsePresenceProps {}
export interface PopoverRootProps extends PopoverRootBaseProps {
  children?: JSX.Element
}

export const PopoverRoot = (props: PopoverRootProps) => {
  const [presenceProps, popoverProps] = splitPresenceProps(props)
  const [usePopoverProps, localProps] = createSplitProps<UsePopoverProps>()(popoverProps, [
    'autoFocus',
    'closeOnEscape',
    'closeOnInteractOutside',
    'defaultOpen',
    'id',
    'ids',
    'initialFocusEl',
    'modal',
    'onEscapeKeyDown',
    'onFocusOutside',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'open',
    'persistentElements',
    'portalled',
    'positioning',
  ])
  const api = usePopover(usePopoverProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().open })))

  return (
    <PopoverProvider value={api}>
      <PresenceProvider value={apiPresence}>{localProps.children}</PresenceProvider>
    </PopoverProvider>
  )
}
