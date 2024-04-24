import type { Context } from '@zag-js/checkbox'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils'

export const props = {
  checked: {
    type: [Boolean, String] as PropType<Context['checked']>,
    default: undefined,
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
  invalid: {
    type: Boolean as PropType<Context['invalid']>,
    default: undefined,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  required: {
    type: Boolean as PropType<Context['required']>,
    default: undefined,
  },
  defaultChecked: {
    type: [Boolean, String] as PropType<Context['checked']>,
  },
}
export const emits = declareEmits(['checked-change', 'update:checked'])
