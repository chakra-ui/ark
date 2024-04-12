import { createContext } from '../create-context'
import type { UseTooltipReturn } from './use-tooltip'

export interface UseTooltipContext extends UseTooltipReturn {}

export const [TooltipProvider, useTooltipContext] = createContext<UseTooltipContext>({
  hookName: 'useTooltipContext',
  providerName: '<TooltipProvider />',
})
