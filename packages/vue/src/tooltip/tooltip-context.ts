import type { connect } from '@zag-js/tooltip'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import type { UseTooltipReturn } from './use-tooltip'

export const [TooltipProvider, useTooltipContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('TooltipContext')

export type TooltipContext = UseTooltipReturn
