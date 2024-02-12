import { createContext } from '../create-context'
import { type UseTooltipReturn } from './use-tooltip'

export interface TooltipContext extends UseTooltipReturn {}

export const [TooltipProvider, useTooltipContext] = createContext<TooltipContext>({
  hookName: 'useTooltipContext',
  providerName: '<TooltipProvider />',
})
