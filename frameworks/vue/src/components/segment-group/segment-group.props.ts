import type { Context } from '@zag-js/radio-group'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils/utils'

export const props = {
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
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  modelValue: {
    type: String as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['value-change', 'update:modelValue'])
