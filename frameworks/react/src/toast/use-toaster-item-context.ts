import type { PropTypes } from '@zag-js/react'
import * as toast from '@zag-js/toast'
import { createContext } from '../create-context'

export interface UseToasterItemContext extends toast.Api<PropTypes> {}

export const [ToasterItemProvider, useToasterItemContext] = createContext<UseToasterItemContext>({
  name: 'ToasterItemContext',
  hookName: 'useToasterItemContext',
  providerName: '<ToasterItemProvider />',
})
