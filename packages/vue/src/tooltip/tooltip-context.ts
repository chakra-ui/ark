import { createContext } from '../context'
import { type UseTooltipReturn } from './use-tooltip'

export const [TooltipProvider, useTooltipContext] =
  createContext<UseTooltipReturn>('TooltipContext')

export type TooltipContext = UseTooltipReturn
