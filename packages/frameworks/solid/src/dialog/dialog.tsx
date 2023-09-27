import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { DialogProvider } from './dialog-context'
import { useDialog, type UseDialogProps, type UseDialogReturn } from './use-dialog'

export type DialogProps = UseDialogProps & {
  children?: JSX.Element | ((state: UseDialogReturn) => JSX.Element)
}

export const Dialog = (props: DialogProps) => {
  const [dialogParams, localProps] = createSplitProps<UseDialogProps>()(props, [
    'aria-label',
    'closeOnEscapeKeyDown',
    'closeOnInteractOutside',
    'dir',
    'finalFocusEl',
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
    'preventScroll',
    'restoreFocus',
    'role',
    'trapFocus',
  ])

  const api = useDialog(dialogParams)
  const getChildren = () => runIfFn(localProps.children, api)

  return <DialogProvider value={api}>{getChildren()}</DialogProvider>
}
