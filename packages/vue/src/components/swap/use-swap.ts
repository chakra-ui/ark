import { type MaybeRef, computed, toValue } from 'vue'
import type { UsePresenceReturn } from '../presence/use-presence'
import { usePresence } from '../presence/use-presence'
import { parts } from './swap.anatomy'

export interface UseSwapProps {
  /**
   * Whether the swap is in the "on" state.
   * @default false
   */
  swap?: boolean
  /**
   * Whether to enable lazy mounting.
   */
  lazyMount?: boolean
  /**
   * Whether to unmount on exit.
   */
  unmountOnExit?: boolean
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

export const useSwap = (props: MaybeRef<UseSwapProps>): UseSwapReturn => {
  const localProps = computed(() => toValue(props))
  const swap = computed(() => localProps.value.swap ?? false)

  const presenceProps = computed(() => ({
    present: swap.value,
    lazyMount: localProps.value.lazyMount,
    unmountOnExit: localProps.value.unmountOnExit,
    skipAnimationOnMount: true,
  }))

  const offPresenceProps = computed(() => ({
    ...presenceProps.value,
    present: !swap.value,
  }))

  const onPresence = usePresence(presenceProps)
  const offPresence = usePresence(offPresenceProps)

  return {
    get swap() {
      return swap.value
    },
    onPresence,
    offPresence,
    getRootProps() {
      return {
        ...parts.root.attrs,
        'data-swap': swap.value ? 'on' : 'off',
        style: { display: 'inline-grid' },
      }
    },
    getIndicatorProps({ type }) {
      const presence = type === 'on' ? onPresence : offPresence
      return {
        ...parts.indicator.attrs,
        ...presence.value.presenceProps,
        'data-type': type,
        style: { 'grid-area': '1 / 1', display: 'inline-flex' },
      }
    },
  }
}
