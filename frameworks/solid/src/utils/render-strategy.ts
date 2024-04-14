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

export const [RenderStrategyProvider, useRenderStrategyContext] =
  createContext<RenderStrategyProps>({
    hookName: 'useRenderStrategyContext',
    providerName: '<RenderStrategyProvider />',
  })

export const splitRenderStrategyProps = <T extends RenderStrategyProps>(props: T) =>
  createSplitProps<RenderStrategyProps>()(props, ['lazyMount', 'unmountOnExit'])
