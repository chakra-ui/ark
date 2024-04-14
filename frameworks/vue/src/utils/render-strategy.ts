import type { ComputedRef } from 'vue'
import { createContext } from './context'

export interface RenderStrategyProps {
  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean
}

export const [RenderStrategyProvider, useRenderStrategyContext] =
  createContext<ComputedRef<RenderStrategyProps>>('RenderStrategyContext')
