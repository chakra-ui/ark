import type { connect } from '@zag-js/tooltip'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export const [TooltipProvider, useTooltipContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('TooltipContext')

// TODO: export type TooltipContext = UseTooltipReturn
