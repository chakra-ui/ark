import type { JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { DialogProvider } from './dialog-context'
import { useDialog, UseDialogProps } from './use-dialog'

export type DialogProps = UseDialogProps & { children: JSX.Element }

export const Dialog = (props: DialogProps) => {
  const [useDialogProps, restProps] = createSplitProps<UseDialogProps>()(props, [
    'aria-label',
    'closeOnEsc',
    'closeOnOutsideClick',
    'defaultOpen',
    'dir',
    'finalFocusEl',
    'getRootNode',
    'id',
    'ids',
    'initialFocusEl',
    'modal',
    'onClose',
    'onEsc',
    'onOutsideClick',
    'preventScroll',
    'restoreFocus',
    'role',
    'trapFocus',
  ])
  const dialog = useDialog(useDialogProps)

  return <DialogProvider value={dialog}>{restProps.children}</DialogProvider>
}
