import type { Context } from '@zag-js/dialog'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  'aria-label': {
    type: String as PropType<Context['aria-label']>,
  },
  closeOnEscapeKeyDown: {
    type: Boolean as PropType<Context['closeOnEscapeKeyDown']>,
    default: undefined,
  },
  closeOnInteractOutside: {
    type: Boolean as PropType<Context['closeOnInteractOutside']>,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  finalFocusEl: {
    type: [Function, Object] as PropType<Context['finalFocusEl']>,
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
    type: [Function, Object] as PropType<Context['initialFocusEl']>,
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
    type: String as PropType<Context['role']>,
  },
  trapFocus: {
    type: Boolean as PropType<Context['trapFocus']>,
    default: undefined,
  },
  defaultOpen: {
    type: Boolean as PropType<Context['open']>,
  },
}
export const emits = declareEmits([
  'escape-key-down',
  'open-change',
  'focus-outside',
  'interact-outside',
  'pointer-down-outside',
  'update:open',
])
