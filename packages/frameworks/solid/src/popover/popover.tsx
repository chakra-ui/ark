import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { PopoverProvider } from './popover-context'
import { usePopover, type UsePopoverProps, type UsePopoverReturn } from './use-popover'

export type PopoverProps = UsePopoverProps & {
  children: JSX.Element | ((api: UsePopoverReturn) => JSX.Element)
}

export const Popover = (props: PopoverProps) => {
  const [popoverProps, localProps] = createSplitProps<UsePopoverProps>()(props, [
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

  const api = usePopover(popoverProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return <PopoverProvider value={api}>{getChildren()}</PopoverProvider>
}
