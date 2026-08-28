import { createContext } from '$lib/utils/create-context'
import type { UseTooltipReturn } from './use-tooltip.svelte.ts'

export interface UseTooltipContext extends UseTooltipReturn {}
export const [TooltipProvider, useTooltipContext] = createContext<UseTooltipContext>({
  name: 'TooltipContext',
})
