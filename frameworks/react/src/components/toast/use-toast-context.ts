import type { PropTypes } from '@zag-js/react'
import type * as toast from '@zag-js/toast'
import { createContext } from '../../utils/create-context'

export interface UseToastContext extends toast.Api<PropTypes> {}

export const [ToastProvider, useToastContext] = createContext<UseToastContext>({
  name: 'ToastContext',
  hookName: 'useToastContext',
  providerName: '<ToastProvider />',
})
