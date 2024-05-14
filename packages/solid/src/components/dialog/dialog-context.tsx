import type { JSX } from 'solid-js'
import { type UseDialogContext, useDialogContext } from './use-dialog-context'

export interface DialogContextProps {
  children: (context: UseDialogContext) => JSX.Element
}

export const DialogContext = (props: DialogContextProps) => props.children(useDialogContext())
