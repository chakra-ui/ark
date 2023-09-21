import { createContext } from '../create-context'
import { type UseToastItemReturn } from './use-toast-item'

export interface ToastItemContext extends UseToastItemReturn {}

export const [ToastItemProvider, useToastItemContext] = createContext<ToastItemContext>({
  name: 'ToastItemContext',
  hookName: 'useToastItemContext',
  providerName: '<ToastItemProvider />',
})
