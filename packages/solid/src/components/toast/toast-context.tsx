import type { JSX } from '@solidjs/web'
import { type UseToastContext, useToastContext } from './use-toast-context.ts'

export interface ToastContextProps {
  children: (context: UseToastContext) => JSX.Element
}

export const ToastContext = (props: ToastContextProps) => props.children(useToastContext())
