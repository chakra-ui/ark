import { createContext } from '../../utils/create-context'
import type { UseToggleReturn } from './use-toggle'

export interface UseToggleContext extends UseToggleReturn {}

export const [ToggleProvider, useToggleContext] = createContext<UseToggleContext>({
  hookName: 'useToggleContext',
  providerName: '<ToggleProvider />',
})
