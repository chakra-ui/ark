import type { Context } from '@zag-js/toggle-group'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils'

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
  loop: {
    type: Boolean as PropType<Context['loopFocus']>,
    default: undefined,
  },
  multiple: {
    type: Boolean as PropType<Context['multiple']>,
    default: undefined,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  rovingFocus: {
    type: Boolean as PropType<Context['rovingFocus']>,
    default: undefined,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['value-change', 'update:modelValue'])
