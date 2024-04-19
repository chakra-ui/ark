import type { Context } from '@zag-js/collapsible'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils'
import type { RenderStrategyProps } from '../../utils/render-strategy'

export const props = {
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
    default: undefined,
  },
  'open.controlled': {
    type: Boolean as PropType<Context['open.controlled']>,
    default: undefined,
  },
  lazyMount: {
    type: Boolean as PropType<RenderStrategyProps['lazyMount']>,
    default: undefined,
  },
  unmountOnExit: {
    type: Boolean as PropType<RenderStrategyProps['unmountOnExit']>,
    default: undefined,
  },
} as const

export const emits = declareEmits(['exit-complete', 'open-change'])
