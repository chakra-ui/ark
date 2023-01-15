import type { JSX } from 'solid-js'
import { children } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { DialogProvider, type DialogContext } from './dialog-context'
import { useDialog, type UseDialogProps } from './use-dialog'

export type DialogProps = UseDialogProps & {
  children?: JSX.Element | ((state: DialogContext) => JSX.Element)
}

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
  const view = () => children(() => runIfFn(restProps.children, dialog))

  return <DialogProvider value={dialog}>{view}</DialogProvider>
}
