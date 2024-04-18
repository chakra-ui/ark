import type { ComputedRef } from 'vue'
import { createContext } from './create-context'

export interface UseRenderStrategyProps {
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
  createContext<ComputedRef<UseRenderStrategyProps>>('RenderStrategyContext')
