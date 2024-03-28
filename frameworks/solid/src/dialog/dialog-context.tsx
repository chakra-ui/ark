import type { JSX } from 'solid-js'
import { useDialogContext, type UseDialogContext } from './use-dialog-context'

export interface DialogContextProps {
  children: (context: UseDialogContext) => JSX.Element
}

export const DialogContext = (props: DialogContextProps) => props.children(useDialogContext())
