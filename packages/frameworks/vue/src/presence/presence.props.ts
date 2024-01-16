import type { Context } from '@zag-js/presence'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'
import type { UsePresenceProps } from './use-presence'

export const presenceProps = {
  /**
   * Whether the node is present (controlled by the user).
   * @default undefined
   */
  present: {
    type: Boolean as PropType<Context['present']>,
    default: undefined,
  },
  /**
   * Whether to enable lazy mounting.
   * @default false
   */
  lazyMount: {
    type: Boolean as PropType<UsePresenceProps['lazyMount']>,
    default: false,
  },
  /**
   * Whether to unmount on exit.
   * @default false
   */
  unmountOnExit: {
    type: Boolean as PropType<UsePresenceProps['unmountOnExit']>,
    default: false,
  },
}

export type PresenceEmits = {
  /** Function called when the animation ends in the closed state. */
  exitComplete: []
}

export const emits = declareEmits(['exit-complete'])
