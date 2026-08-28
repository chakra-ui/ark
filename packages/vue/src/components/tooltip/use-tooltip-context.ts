import { createContext } from '../../utils/create-context.ts'
import type { UseTooltipReturn } from './use-tooltip.ts'

export interface UseTooltipContext extends UseTooltipReturn {}

export const [TooltipProvider, useTooltipContext] = createContext<UseTooltipContext>('TooltipContext')
