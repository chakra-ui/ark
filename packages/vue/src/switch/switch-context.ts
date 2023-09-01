import { createContext } from '../context'
import type { UseSwitchReturn } from './use-switch'

export const [SwitchProvider, useSwitchContext] = createContext<UseSwitchReturn>('SwitchContext')
