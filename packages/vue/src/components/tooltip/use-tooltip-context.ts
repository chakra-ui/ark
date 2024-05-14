import { createContext } from '../../utils'
import type { UseTooltipReturn } from './use-tooltip'

export interface UseTooltipContext extends UseTooltipReturn {}

export const [TooltipProvider, useTooltipContext] =
  createContext<UseTooltipContext>('TooltipContext')
