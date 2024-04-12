import type * as toast from '@zag-js/toast'
import type { PropTypes } from '@zag-js/vue'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export interface ToastContext extends ComputedRef<toast.Api<PropTypes>> {}

export const [ToastProvider, useToastContext] = createContext<ToastContext>('ToastContext')
