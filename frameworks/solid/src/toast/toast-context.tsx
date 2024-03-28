import type { JSX } from 'solid-js'
import { useToastContext, type UseToastContext } from './use-toast-context'

export interface ToastContextProps {
  children: (context: UseToastContext) => JSX.Element
}

export const ToastContext = (props: ToastContextProps) => props.children(useToastContext())
