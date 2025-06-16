import type { Accessor } from '$lib/types'
import { createContext } from './create-context'
import { createSplitProps } from './create-split-props'

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

export interface RenderStrategyContext extends Accessor<RenderStrategyProps> {}

export const [RenderStrategyPropsProvider, useRenderStrategyPropsContext] = createContext<RenderStrategyContext>({
  name: 'RenderStrategyContext',
  hookName: 'useRenderStrategyContext',
  providerName: '<RenderStrategyPropsProvider />',
})

const splitFn = createSplitProps<RenderStrategyProps>()

export const splitRenderStrategyProps = <T extends RenderStrategyProps>(props: T) =>
  splitFn(props, ['lazyMount', 'unmountOnExit'])
