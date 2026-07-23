'use client'

import { createContext } from './create-context.ts'
import { createSplitProps } from './create-split-props.ts'

export type HideMode = 'display-none' | 'activity'

export interface RenderStrategyProps {
  /**
   * Whether to enable lazy mounting
   * @default false
   */
  lazyMount?: boolean | undefined
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit?: boolean | undefined
  /**
   * How to hide content when mounted but not present.
   * - `'display-none'`: HTML `hidden` attribute. Effects stay alive.
   * - `'activity'`: React 19 `<Activity mode="hidden">`. Effects pause. Requires React 19+.
   * @default 'display-none'
   */
  hideMode?: HideMode | undefined
}

export const [RenderStrategyPropsProvider, useRenderStrategyPropsContext] = createContext<RenderStrategyProps>({
  name: 'RenderStrategyContext',
  hookName: 'useRenderStrategyContext',
  providerName: '<RenderStrategyPropsProvider />',
})

export const splitRenderStrategyProps = <T extends RenderStrategyProps>(props: T) =>
  createSplitProps<RenderStrategyProps>()(props, ['lazyMount', 'unmountOnExit', 'hideMode'])
