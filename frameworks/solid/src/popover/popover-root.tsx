import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { usePopover, type UsePopoverProps } from './use-popover'
import { PopoverProvider } from './use-popover-context'

export interface PopoverRootProps extends UsePopoverProps, UsePresenceProps {
  children?: JSX.Element
}

export const PopoverRoot = (props: PopoverRootProps) => {
  const [presenceProps, popoverProps] = splitPresenceProps(props)
  const [usePopoverProps, localProps] = createSplitProps<UsePopoverProps>()(popoverProps, [
    'autoFocus',
    'closeOnEsc',
    'closeOnInteractOutside',
    'dir',
    'getRootNode',
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
    'portalled',
    'positioning',
  ])
  const api = usePopover(usePopoverProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))

  return (
    <PopoverProvider value={api}>
      <PresenceProvider value={apiPresence}>{localProps.children}</PresenceProvider>
    </PopoverProvider>
  )
}
