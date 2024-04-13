import type { CommonProperties } from '@zag-js/types'
import { createContext } from '../../utils/create-context'

export type EnvironmentContext = CommonProperties['getRootNode']

export const [EnvironmentProvider, useEnvironmentContext] = createContext<EnvironmentContext>({
  name: 'EnvironmentContext',
  hookName: 'useEnvironmentContext',
  providerName: '<EnvironmentProvider />',
  strict: false,
})
