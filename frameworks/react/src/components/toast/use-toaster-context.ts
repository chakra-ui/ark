import type * as toast from '@zag-js/toast'
import { createContext } from '../../utils/create-context'

export type UseToasterContext = toast.Service[]

export const [ToasterProvider, useToasterContext] = createContext<UseToasterContext>({
  name: 'ToasterContext',
  hookName: 'useToasterContext',
  providerName: '<ToasterProvider />',
})
