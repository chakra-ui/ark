import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { runIfFn } from '../run-if-fn'
import { PopoverProvider } from './popover-context'
import { usePopover, type UsePopoverProps, type UsePopoverReturn } from './use-popover'

export interface PopoverProps extends UsePopoverProps, UsePresenceProps {
  children?: JSX.Element | ((api: UsePopoverReturn) => JSX.Element)
}

export const Popover = (props: PopoverProps) => {
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
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <PopoverProvider value={api}>
      <PresenceProvider value={apiPresence}>{getChildren()}</PresenceProvider>
    </PopoverProvider>
  )
}
