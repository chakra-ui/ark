import type { Context } from '@zag-js/switch'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  focusable: {
    type: Boolean as PropType<Context['focusable']>,
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
  invalid: {
    type: Boolean as PropType<Context['invalid']>,
    default: undefined,
  },
  label: {
    type: String as PropType<Context['label']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
    default: undefined,
  },
  required: {
    type: Boolean as PropType<Context['required']>,
  },
  value: {
    type: String as PropType<Context['value']>,
  },
  modelValue: {
    type: Boolean as PropType<Context['checked']>,
  },
}
export const emits = declareEmits(['change', 'update:modelValue'])
