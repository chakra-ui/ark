import { createContext } from '$lib/utils/create-context'
import type { UseProgressReturn } from './use-progress.svelte.ts'

export interface UseProgressContext extends UseProgressReturn {}
export const [ProgressProvider, useProgressContext] = createContext<UseProgressContext>({
  name: 'ProgressContext',
})
