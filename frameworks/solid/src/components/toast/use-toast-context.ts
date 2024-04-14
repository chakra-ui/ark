import type { PropTypes } from '@zag-js/solid'
import type * as toast from '@zag-js/toast'
import type { Accessor, JSX } from 'solid-js'
import { createContext } from '../../utils/create-context'

export interface Options {
  render: (api: Accessor<toast.Api<PropTypes, Options>>) => JSX.Element
  title: JSX.Element
  description: JSX.Element
}

export interface UseToastContext extends Accessor<toast.Api<PropTypes, Options>> {}

export const [ToastProvider, useToastContext] = createContext<UseToastContext>({
  hookName: 'useToastContext',
  providerName: '<ToastProvider />',
})
