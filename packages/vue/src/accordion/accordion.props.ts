import type { Context } from '@zag-js/accordion'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  collapsible: {
    type: Boolean as PropType<Context['collapsible']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
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
  multiple: {
    type: Boolean as PropType<Context['multiple']>,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
}

export const emits = declareEmits(['change', 'focus-change', 'update:modelValue'])
