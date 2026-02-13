import { mergeProps } from '@zag-js/solid'
import { type Accessor, createMemo } from 'solid-js'
import type { MaybeAccessor } from '../../types'
import type { RenderStrategyProps } from '../../utils/render-strategy'
import { runIfFn } from '../../utils/run-if-fn'
import type { HTMLProps } from '../factory'
import { type UsePresenceReturn, usePresence } from '../presence/use-presence'
import { parts } from './swap.anatomy'

export interface UseSwapProps extends RenderStrategyProps {
  /**
   * Whether the swap is in the "on" state.
   * @default false
   */
  swap?: boolean
}

export interface IndicatorProps {
  type: 'on' | 'off'
}

export interface UseSwapReturn {
  /**
   * Whether the swap is in the "on" state.
   */
  swap: boolean
  /**
   * The presence instance for the "on" indicator.
   */
  onPresence: UsePresenceReturn
  /**
   * The presence instance for the "off" indicator.
   */
  offPresence: UsePresenceReturn
  /**
   * Props for the root element.
   */
  getRootProps: () => HTMLProps<'span'>
  /**
   * Props for the indicator element.
   */
  getIndicatorProps: (props: IndicatorProps) => HTMLProps<'span'>
}

export const useSwap = (props: MaybeAccessor<UseSwapProps> = {}): Accessor<UseSwapReturn> => {
  const resolved = createMemo(() => runIfFn(props))

  const onPresence = usePresence(
    mergeProps(() => ({
      present: resolved().swap ?? false,
      lazyMount: resolved().lazyMount,
      unmountOnExit: resolved().unmountOnExit,
      skipAnimationOnMount: true,
    })),
  )

  const offPresence = usePresence(
    mergeProps(() => ({
      present: !(resolved().swap ?? false),
      lazyMount: resolved().lazyMount,
      unmountOnExit: resolved().unmountOnExit,
      skipAnimationOnMount: true,
    })),
  )

  return createMemo(() => {
    const swap = resolved().swap ?? false
    return {
      swap,
      onPresence,
      offPresence,
      getRootProps() {
        return {
          ...parts.root.attrs,
          'data-swap': swap ? 'on' : 'off',
          style: { display: 'inline-grid' },
        }
      },
      getIndicatorProps({ type }) {
        const presence = type === 'on' ? onPresence() : offPresence()
        return {
          ...parts.indicator.attrs,
          ...presence.presenceProps,
          'data-type': type,
          style: { 'grid-area': '1 / 1', display: 'inline-flex' },
        }
      },
    }
  })
}
