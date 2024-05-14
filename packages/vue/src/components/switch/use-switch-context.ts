import { createContext } from '../../utils'
import type { UseSwitchReturn } from './use-switch'

export interface UseSwitchContext extends UseSwitchReturn {}

export const [SwitchProvider, useSwitchContext] = createContext<UseSwitchContext>('SwitchContext')
