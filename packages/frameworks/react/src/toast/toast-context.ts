import type { PropTypes } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { createContext } from '../create-context'

export interface ToastContext extends toast.Api<PropTypes> {}

export const [ToastProvider, useToastContext] = createContext<ToastContext>({
  name: 'ToastContext',
  hookName: 'useToastContext',
  providerName: '<ToastProvider />',
})
