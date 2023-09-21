import { type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { DialogProvider, type DialogContext } from './dialog-context'
import { useDialog, type UseDialogProps } from './use-dialog'

export interface DialogProps
  extends Assign<
    UseDialogProps,
    { children?: ReactNode | ((props: DialogContext) => ReactNode) }
  > {}

export const Dialog = (props: DialogProps) => {
  const { children, ...useDialogProps } = props
  const api = useDialog(useDialogProps)
  const view = runIfFn(children, api)

  return <DialogProvider value={api}>{view}</DialogProvider>
}
