import { createContext } from '../../utils/create-context.ts'
import type { UseNumberFlowReturn } from './use-number-flow.ts'

export interface UseNumberFlowContext extends UseNumberFlowReturn {}

export const [NumberFlowProvider, useNumberFlowContext] = createContext<UseNumberFlowContext>('NumberFlowContext')
