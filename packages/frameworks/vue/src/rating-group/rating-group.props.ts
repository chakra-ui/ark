import type { Context } from '@zag-js/rating-group'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  allowHalf: {
    type: Boolean as PropType<Context['allowHalf']>,
    default: undefined,
  },
  autoFocus: {
    type: Boolean as PropType<Context['autoFocus']>,
    default: undefined,
  },
  count: {
    type: Number as PropType<Context['count']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  form: {
    type: String as PropType<Context['form']>,
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
  name: {
    type: String as PropType<Context['name']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
    default: undefined,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  modelValue: {
    type: Number as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['hover-change', 'value-change', 'update:modelValue'])
