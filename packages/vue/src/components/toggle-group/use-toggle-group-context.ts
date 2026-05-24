import { createContext } from '../../utils/create-context.ts'
import type { UseToggleGroupReturn } from './use-toggle-group.ts'

export interface UseToggleGroupContext extends UseToggleGroupReturn {}

export const [ToggleGroupProvider, useToggleGroupContext] = createContext<UseToggleGroupContext>('ToggleGroupContext')
