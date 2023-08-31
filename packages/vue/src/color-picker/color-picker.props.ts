import type { Context } from '@zag-js/color-picker'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
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
  name: {
    type: String as PropType<Context['name']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
  },
  value: {
    type: String as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['change', 'change-end'])
