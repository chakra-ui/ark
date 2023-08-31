import type { Context } from '@zag-js/checkbox'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  checked: {
    type: String as PropType<Context['checked']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
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
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  required: {
    type: Boolean as PropType<Context['required']>,
  },
  value: {
    type: String as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['change'])
