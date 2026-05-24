import { createContext } from '../../utils/create-context.ts'
import type { UseSwitchReturn } from './use-switch.ts'

export interface UseSwitchContext extends UseSwitchReturn {}

export const [SwitchProvider, useSwitchContext] = createContext<UseSwitchContext>('SwitchContext')
