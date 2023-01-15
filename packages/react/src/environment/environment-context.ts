import type { CommonProperties, DirectionProperty } from '@zag-js/types'
import { createContext } from '../create-context'

export type EnvironmentContext = Omit<DirectionProperty & CommonProperties, 'id'>

export const [EnvironmentProvider, useEnvironmentContext] = createContext<EnvironmentContext>({
  name: 'EnvironmentContext',
  hookName: 'useEnvironmentContext',
  providerName: '<EnvironmentProvider />',
  strict: false,
  defaultValue: {},
})
