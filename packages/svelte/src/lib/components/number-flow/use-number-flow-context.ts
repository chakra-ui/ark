import { createContext } from '$lib/utils/create-context'
import type { UseNumberFlowReturn } from './use-number-flow.svelte.ts'

export interface UseNumberFlowContext extends UseNumberFlowReturn {}

export const [NumberFlowProvider, useNumberFlowContext] = createContext<UseNumberFlowContext>({
  name: 'NumberFlowContext',
})
