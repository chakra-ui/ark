import type { ReactNode } from 'react'
import { useToastContext, type UseToastContext } from './use-toast-context'

export interface ToastContextProps {
  children: (context: UseToastContext) => ReactNode
}

export const ToastContext = (props: ToastContextProps) => props.children(useToastContext())
