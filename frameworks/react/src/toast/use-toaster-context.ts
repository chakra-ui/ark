import * as toast from '@zag-js/toast'
import { createContext } from '../create-context'

export type UseToasterContext = toast.Service<toast.GenericOptions>[]

export const [ToasterProvider, useToasterContext] = createContext<UseToasterContext>({
  name: 'ToasterContext',
  hookName: 'useToasterContext',
  providerName: '<ToasterProvider />',
})
