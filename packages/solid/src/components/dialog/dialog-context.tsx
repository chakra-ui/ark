import type { JSX } from '@solidjs/web'
import { type UseDialogContext, useDialogContext } from './use-dialog-context.ts'

export interface DialogContextProps {
  children: (context: UseDialogContext) => JSX.Element
}

export const DialogContext = (props: DialogContextProps) => props.children(useDialogContext())
