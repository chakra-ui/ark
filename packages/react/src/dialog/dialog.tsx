import type { PropsWithChildren } from 'react'
import { DialogProvider } from './dialog-context'
import { useDialog, UseDialogProps } from './use-dialog'

export type DialogProps = PropsWithChildren<UseDialogProps>

export const Dialog = (props: DialogProps) => {
  const { children, ...useDialogProps } = props
  const dialog = useDialog(useDialogProps)
  return <DialogProvider value={dialog}>{children}</DialogProvider>
}
