import type { Accessor } from '$lib/types'
import type { PropTypes } from '@zag-js/svelte'
import type * as toast from '@zag-js/toast'
import type { Snippet } from 'svelte'
import { createContext } from '../../utils/create-context'

export interface UseToastContext extends Accessor<toast.Api<PropTypes, Snippet>> {}

export const [ToastProvider, useToastContext] = createContext<UseToastContext>({
  name: 'ToastContext',
  hookName: 'useToastContext',
  providerName: '<ToastProvider />',
})
