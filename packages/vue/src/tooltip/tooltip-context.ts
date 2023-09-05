import { createContext } from '../context'
import { type UseTooltipReturn } from './use-tooltip'

export type TooltipContext = UseTooltipReturn

export const [TooltipProvider, useTooltipContext] = createContext<TooltipContext>('TooltipContext')
