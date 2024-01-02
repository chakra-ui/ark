import type { Context } from '@zag-js/presence'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'
import type { UsePresenceProps } from './use-presence'

export const props = {
  present: {
    type: Boolean as PropType<Context['present']>,
    default: undefined,
  },
  lazyMount: {
    type: Boolean as PropType<UsePresenceProps['lazyMount']>,
    default: false,
  },
  unmountOnExit: {
    type: Boolean as PropType<UsePresenceProps['unmountOnExit']>,
    default: false,
  },
}

export const emits = declareEmits(['exit-complete'])
