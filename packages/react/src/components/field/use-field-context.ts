import { createContext } from '../../utils/create-context'
import type { UseFieldReturn } from './use-field'

export interface UseFieldContext extends UseFieldReturn {}

export const [FieldProvider, useFieldContext] = createContext<UseFieldContext>({
  name: 'FieldContext',
  hookName: 'useFieldContext',
  providerName: '<FieldProvider />',
  strict: false,
})
