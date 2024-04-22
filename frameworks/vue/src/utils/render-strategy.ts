import type { ComputedRef, PropType } from 'vue'
import { createContext } from './create-context'

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

export const renderStrategyProps = {
  lazyMount: {
    type: Boolean as PropType<RenderStrategyProps['lazyMount']>,
    default: false,
  },
  unmountOnExit: {
    type: Boolean as PropType<RenderStrategyProps['unmountOnExit']>,
    default: false,
  },
}

export const [RenderStrategyProvider, useRenderStrategyContext] =
  createContext<ComputedRef<RenderStrategyProps>>('RenderStrategyContext')
