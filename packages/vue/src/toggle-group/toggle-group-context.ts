import { createContext } from '../context'
import { type UseToggleGroupReturn } from './use-toggle-group'
export type ToggleGroupContext = UseToggleGroupReturn

export const [ToggleGroupProvider, useToggleGroupContext] =
  createContext<ToggleGroupContext>('ToggleGroupContext')
