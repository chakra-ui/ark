import type { PropsWithChildren, ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { DialogContext, DialogProvider } from './dialog-context'
import { useDialog, UseDialogProps } from './use-dialog'

export type DialogProps = Assign<
  PropsWithChildren<UseDialogProps>,
  {
    children: ReactNode | ((pages: DialogContext) => ReactNode)
  }
>

export const Dialog = (props: DialogProps) => {
  const { children, ...useDialogProps } = props
  const dialog = useDialog(useDialogProps)
  const view = runIfFn(children, dialog)
  return <DialogProvider value={dialog}>{view}</DialogProvider>
}
