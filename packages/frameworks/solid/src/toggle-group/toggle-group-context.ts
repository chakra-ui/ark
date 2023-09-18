import { createContext } from '../create-context'
import { type UseToggleGroupReturn } from './use-toggle-group'

export type ToggleGroupContext = UseToggleGroupReturn

export const [ToggleGroupProvider, useToggleGroupContext] = createContext<ToggleGroupContext>({
  hookName: 'useToggleGroupContext',
  providerName: '<ToggleGroupProvider />',
})
