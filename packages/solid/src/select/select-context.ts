import { createContext } from '../createContext'
import type { UseSelectReturn } from './use-select'

export type SelectContext = UseSelectReturn

export const [SelectProvider, useSelectContext] = createContext<SelectContext>({
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
  strict: false,
})
