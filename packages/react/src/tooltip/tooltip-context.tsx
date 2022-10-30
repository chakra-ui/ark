import { createContext } from '../createContext'
import type { UseTooltipReturn } from './use-tooltip'

export type TooltipContext = UseTooltipReturn['api']

export const [TooltipProvider, useTooltipContext] = createContext<TooltipContext>({
  name: 'TooltipContext',
  hookName: 'useTooltipContext',
  providerName: '<TooltipProvider />',
})
