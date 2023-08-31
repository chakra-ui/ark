import type { Context } from '@zag-js/rating-group'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  allowHalf: {
    type: Boolean as PropType<Context['allowHalf']>,
  },
  autoFocus: {
    type: Boolean as PropType<Context['autoFocus']>,
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
  max: {
    type: Number as PropType<Context['max']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  value: {
    type: Number as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['change', 'hover'])
