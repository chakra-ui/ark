import type { Context } from '@zag-js/radio-group'
import type { PropType } from 'vue'

export const props = {
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
  name: {
    type: String as PropType<Context['name']>,
  },
  onChange: {
    type: Function as PropType<Context['onChange']>,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
  },
  value: {
    type: String as PropType<Context['value']>,
  },
}
