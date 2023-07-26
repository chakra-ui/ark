import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { PopoverProvider } from './popover-context'
import { usePopover, type UsePopoverProps } from './use-popover'

export type PopoverProps = UsePopoverProps & { children: JSX.Element }

export const Popover = (props: PopoverProps) => {
  const [usePopoverProps, restProps] = createSplitProps<UsePopoverProps>()(props, [
    'autoFocus',
    'closeOnEsc',
    'closeOnInteractOutside',
    'getRootNode',
    'id',
    'ids',
    'initialFocusEl',
    'modal',
    'onClose',
    'onEscapeKeyDown',
    'onFocusOutside',
    'onInteractOutside',
    'onOpen',
    'onPointerDownOutside',
    'open',
    'portalled',
    'positioning',
  ])

  const api = usePopover(usePopoverProps)

  return <PopoverProvider value={api}>{restProps.children}</PopoverProvider>
}
