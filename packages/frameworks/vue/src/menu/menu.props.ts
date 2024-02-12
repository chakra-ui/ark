import type { Context } from '@zag-js/menu'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  anchorPoint: {
    type: Object as PropType<Context['anchorPoint']>,
  },
  'aria-label': {
    type: String as PropType<Context['aria-label']>,
  },
  closeOnSelect: {
    type: Boolean as PropType<Context['closeOnSelect']>,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  highlightedId: {
    type: String as PropType<Context['highlightedId']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  loop: {
    type: Boolean as PropType<Context['loop']>,
    default: undefined,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
  modelValue: {
    type: Object as PropType<Context['value']>,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
  },
}
export const emits = declareEmits(['open-change', 'select', 'value-change', 'update:modelValue'])
