import type { Context } from '@zag-js/presence'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils'
import type { RenderStrategyProps } from '../../utils/render-strategy'

export const props = {
  present: {
    type: Boolean as PropType<Context['present']>,
    default: undefined,
  },
  lazyMount: {
    type: Boolean as PropType<RenderStrategyProps['lazyMount']>,
    default: false,
  },
  unmountOnExit: {
    type: Boolean as PropType<RenderStrategyProps['unmountOnExit']>,
    default: false,
  },
}

export const emits = declareEmits(['exit-complete'])
