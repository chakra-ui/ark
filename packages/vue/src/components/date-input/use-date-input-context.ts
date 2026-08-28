import { createContext } from '../../utils/create-context.ts'
import type { UseDateInputReturn } from './use-date-input.ts'

export interface UseDateInputContext extends UseDateInputReturn {}

export const [DateInputProvider, useDateInputContext] = createContext<UseDateInputContext>('DateInputContext')
