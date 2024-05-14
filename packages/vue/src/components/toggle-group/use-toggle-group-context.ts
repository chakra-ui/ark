import { createContext } from '../../utils'
import type { UseToggleGroupReturn } from './use-toggle-group'

export interface UseToggleGroupContext extends UseToggleGroupReturn {}

export const [ToggleGroupProvider, useToggleGroupContext] =
  createContext<UseToggleGroupContext>('ToggleGroupContext')
