import { createContext } from '../../utils/create-context'
import type { UseToggleGroupReturn } from './use-toggle-group'

export interface UseToggleGroupContext extends UseToggleGroupReturn {}

export const [ToggleGroupProvider, useToggleGroupContext] = createContext<UseToggleGroupContext>({
  name: 'ToggleGroupContext',
  hookName: 'useToggleGroupContext',
  providerName: '<ToggleGroupProvider />',
})
