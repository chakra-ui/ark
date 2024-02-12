import type { PropTypes } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import type { Accessor, JSX } from 'solid-js'
import { createContext } from '../create-context'

export interface Options {
  render: (api: Accessor<toast.Api<PropTypes, Options>>) => JSX.Element
  title: JSX.Element
  description: JSX.Element
}

export interface ToastContext extends Accessor<toast.Api<PropTypes, Options>> {}

export const [ToastProvider, useToastContext] = createContext<ToastContext>({
  hookName: 'useToastContext',
  providerName: '<ToastProvider />',
})
