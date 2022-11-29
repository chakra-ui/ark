import type { JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { PopoverProvider } from './popover-context'
import { usePopover, UsePopoverProps } from './use-popover'

export type PopoverProps = UsePopoverProps & { children: JSX.Element }

export const Popover = (props: PopoverProps) => {
  const [usePopoverProps, restProps] = createSplitProps<UsePopoverProps>()(props, [
    'autoFocus',
    'closeOnEsc',
    'closeOnInteractOutside',
    'defaultOpen',
    'defaultOpen',
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
    'portalled',
    'positioning',
  ])
  const popover = usePopover(usePopoverProps)

  return <PopoverProvider value={popover}>{restProps.children}</PopoverProvider>
}
