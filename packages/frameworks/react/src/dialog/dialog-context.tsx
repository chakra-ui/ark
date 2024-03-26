import { useDialogContext, type UseDialogContext } from './use-dialog-context'

export interface DialogContextProps {
  children: (context: UseDialogContext) => React.ReactNode
}

export const DialogContext = (props: DialogContextProps) => props.children(useDialogContext())
