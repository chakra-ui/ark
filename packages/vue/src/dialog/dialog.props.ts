import type { Context } from '@zag-js/dialog'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  'aria-label': {
    type: String as PropType<Context['aria-label']>,
  },
  closeOnEsc: {
    type: Boolean as PropType<Context['closeOnEsc']>,
    default: undefined,
  },
  closeOnOutsideClick: {
    type: Boolean as PropType<Context['closeOnOutsideClick']>,
    default: undefined,
  },
  dir: {
    type: Object as PropType<Context['dir']>,
  },
  finalFocusEl: {
    type: Object as PropType<Context['finalFocusEl']>,
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
  preventScroll: {
    type: Boolean as PropType<Context['preventScroll']>,
    default: undefined,
  },
  restoreFocus: {
    type: Boolean as PropType<Context['restoreFocus']>,
    default: undefined,
  },
  role: {
    type: Object as PropType<Context['role']>,
  },
  trapFocus: {
    type: Boolean as PropType<Context['trapFocus']>,
    default: undefined,
  },
}
export const emits = declareEmits(['close', 'esc', 'open', 'outside-click'])
