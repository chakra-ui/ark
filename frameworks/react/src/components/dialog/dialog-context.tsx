import type { ReactNode } from 'react'
import { type UseDialogContext, useDialogContext } from './use-dialog-context'

export interface DialogContextProps {
  children: (context: UseDialogContext) => ReactNode
}

export const DialogContext = (props: DialogContextProps) => props.children(useDialogContext())
