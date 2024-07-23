import { createContext } from '../../utils/create-context'
import type { UseFieldsetReturn } from './use-fieldset'

export interface UseFieldsetContext extends UseFieldsetReturn {}

export const [FieldsetProvider, useFieldsetContext] = createContext<UseFieldsetContext>({
  name: 'FieldsetContext',
  hookName: 'useFieldsetContext',
  providerName: '<FieldsetProvider />',
  strict: false,
})
