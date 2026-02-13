import type { RenderStrategyProps } from 'src/utils/render-strategy'
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

export const useSwap = (props: UseSwapProps = {}): UseSwapReturn => {
  const { swap = false, lazyMount, unmountOnExit } = props

  const presenceProps = { lazyMount, unmountOnExit }

  const onPresence = usePresence({ present: swap, ...presenceProps, skipAnimationOnMount: true })
  const offPresence = usePresence({ present: !swap, ...presenceProps, skipAnimationOnMount: true })

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
      const presence = type === 'on' ? onPresence : offPresence
      return {
        ...parts.indicator.attrs,
        ...presence.getPresenceProps(),
        'data-type': type,
        style: { gridArea: '1 / 1', display: 'inline-flex' },
      }
    },
  }
}
