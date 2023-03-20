import { createContext } from '../create-context'
import { type UseTooltipReturn } from './use-tooltip'

export type TooltipContext = UseTooltipReturn

export const [TooltipProvider, useTooltipContext] = createContext<TooltipContext>({
  name: 'TooltipContext',
  hookName: 'useTooltipContext',
  providerName: '<TooltipProvider />',
})
