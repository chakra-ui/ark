import { children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { DialogProvider, useDialogContext } from './dialog-context'
import { useDialog, type UseDialogProps, type UseDialogReturn } from './use-dialog'

export type DialogProps = UseDialogProps & {
  children?: JSX.Element | ((state: UseDialogReturn) => JSX.Element)
}

export const Dialog = (props: DialogProps) => {
  const [dialogParams, localProps] = createSplitProps<UseDialogProps>()(props, [
    'aria-label',
    'closeOnEsc',
    'closeOnOutsideClick',
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
    'open',
    'preventScroll',
    'restoreFocus',
    'role',
    'trapFocus',
    'onOpen',
  ])

  const api = useDialog(dialogParams)

  return (
    <DialogProvider value={api}>
      <DialogContextWrapper {...localProps} />
    </DialogProvider>
  )
}

const DialogContextWrapper = (props: Pick<DialogProps, 'children'>) => {
  const dialog = useDialogContext()
  const view = children(() => runIfFn(props.children, dialog))

  return <>{view()}</>
}
