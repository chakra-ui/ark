import { createContext } from '../../utils/context'
import type { UseTooltipReturn } from './use-tooltip'

export interface TooltipContext extends UseTooltipReturn {}

export const [TooltipProvider, useTooltipContext] = createContext<TooltipContext>('TooltipContext')
