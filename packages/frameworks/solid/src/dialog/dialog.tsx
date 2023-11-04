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
import { DialogProvider } from './dialog-context'
import { useDialog, type UseDialogProps, type UseDialogReturn } from './use-dialog'

export interface DialogProps extends UseDialogProps, UsePresenceProps {
  children: JSX.Element | ((api: UseDialogReturn) => JSX.Element)
}

export const Dialog = (props: DialogProps) => {
  const [presenceProps, dialogProps] = splitPresenceProps(props)
  const [useDialogProps, localProps] = createSplitProps<UseDialogProps>()(dialogProps, [
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

  const api = useDialog(useDialogProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <DialogProvider value={api}>
      <PresenceProvider value={apiPresence}>{getChildren()}</PresenceProvider>
    </DialogProvider>
  )
}
