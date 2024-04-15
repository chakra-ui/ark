import type { PropTypes } from '@zag-js/react'
import type * as toast from '@zag-js/toast'
import { createContext } from '../../utils/create-context'

export type UseToasterContext = toast.Api<PropTypes, any>[]

export const [ToasterProvider, useToasterContext] = createContext<UseToasterContext>({
  name: 'ToasterContext',
  hookName: 'useToasterContext',
  providerName: '<ToasterProvider />',
})
