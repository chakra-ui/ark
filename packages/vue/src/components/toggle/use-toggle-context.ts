import { createContext } from '../../utils'
import type { UseToggleReturn } from './use-toggle'

export interface UseToggleContext extends UseToggleReturn {}

export const [ToggleProvider, useToggleContext] = createContext<UseToggleContext>('ToggleContext')
