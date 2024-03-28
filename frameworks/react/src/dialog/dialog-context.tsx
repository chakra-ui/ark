import type { ReactNode } from 'react'
import { useDialogContext, type UseDialogContext } from './use-dialog-context'

export interface DialogContextProps {
  children: (context: UseDialogContext) => ReactNode
}

export const DialogContext = (props: DialogContextProps) => props.children(useDialogContext())
