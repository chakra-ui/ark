import type { Context } from '@zag-js/popover'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  autoFocus: {
    type: Boolean as PropType<Context['autoFocus']>,
    default: undefined,
  },
  closeOnEsc: {
    type: Boolean as PropType<Context['closeOnEsc']>,
    default: undefined,
  },
  closeOnInteractOutside: {
    type: Boolean as PropType<Context['closeOnInteractOutside']>,
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
  initialFocusEl: {
    type: Object as PropType<Context['initialFocusEl']>,
  },
  modal: {
    type: Boolean as PropType<Context['modal']>,
    default: undefined,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
    default: undefined,
  },
  portalled: {
    type: Boolean as PropType<Context['portalled']>,
    default: undefined,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
}
export const emits = declareEmits([
  'escape-key-down',
  'focus-outside',
  'interact-outside',
  'pointer-down-outside',
  'open-change',
  'update:modelValue',
])
