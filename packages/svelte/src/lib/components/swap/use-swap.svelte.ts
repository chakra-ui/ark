import type { Accessor } from '$lib/types'
import type { RenderStrategyProps } from '$lib/utils/render-strategy'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { type UsePresenceReturn, usePresence } from '../presence/use-presence.svelte'
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
  getRootProps: () => Record<string, unknown>
  /**
   * Props for the indicator element.
   */
  getIndicatorProps: (props: IndicatorProps) => Record<string, unknown>
}

export const useSwap = (props: MaybeFunction<UseSwapProps> = {}): Accessor<UseSwapReturn> => {
  const resolvedProps = $derived(runIfFn(props))
  const swap = $derived(resolvedProps.swap ?? false)

  const onPresence = usePresence(() => ({
    present: swap,
    lazyMount: resolvedProps.lazyMount,
    unmountOnExit: resolvedProps.unmountOnExit,
    skipAnimationOnMount: true,
  }))

  const offPresence = usePresence(() => ({
    present: !swap,
    lazyMount: resolvedProps.lazyMount,
    unmountOnExit: resolvedProps.unmountOnExit,
    skipAnimationOnMount: true,
  }))

  const result = $derived({
    swap,
    onPresence,
    offPresence,
    getRootProps() {
      return {
        ...parts.root.attrs,
        'data-swap': swap ? 'on' : 'off',
        style: 'display: inline-grid',
      }
    },
    getIndicatorProps({ type }: IndicatorProps) {
      const presence = type === 'on' ? onPresence() : offPresence()
      return {
        ...parts.indicator.attrs,
        ...presence.getPresenceProps(),
        'data-type': type,
        style: 'grid-area: 1 / 1; display: inline-flex',
      }
    },
  })

  return () => result
}
