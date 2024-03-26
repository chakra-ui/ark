import { useToastContext, type UseToastContext } from './use-toast-context'

export interface ToastContextProps {
  children: (context: UseToastContext) => React.ReactNode
}

export const ToastContext = (props: ToastContextProps) => props.children(useToastContext())
