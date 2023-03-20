import { type PropsWithChildren, type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { DialogProvider, type DialogContext } from './dialog-context'
import { useDialog, type UseDialogProps } from './use-dialog'

export type DialogProps = Assign<
  PropsWithChildren<UseDialogProps>,
  {
    children?: ReactNode | ((pages: DialogContext) => ReactNode)
  }
>

export const Dialog = (props: DialogProps) => {
  const { children, ...useDialogProps } = props
  const dialog = useDialog(useDialogProps)
  const view = runIfFn(children, dialog)
  return <DialogProvider value={dialog}>{view}</DialogProvider>
}
