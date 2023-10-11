import type { PropTypes } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import type { Accessor } from 'solid-js'
import { createContext } from '../create-context'

export interface ToastContext extends Accessor<toast.Api<PropTypes>> {}

export const [ToastProvider, useToastContext] = createContext<ToastContext>({
  hookName: 'useToastContext',
  providerName: '<ToastProvider />',
})
