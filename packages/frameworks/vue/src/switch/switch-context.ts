import { createContext } from '../context'
import type { UseSwitchReturn } from './use-switch'

export type SwitchContext = UseSwitchReturn
export const [SwitchProvider, useSwitchContext] = createContext<SwitchContext>('SwitchContext')
