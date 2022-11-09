import { createContext } from '../createContext'
import type { UseToastReturn } from './use-toast'

export type ToastContext = UseToastReturn

export const [ToastProvider, useToastContext] = createContext<ToastContext>({
  name: 'ToastContext',
  hookName: 'useToastContext',
  providerName: '<ToastProvider />',
})
