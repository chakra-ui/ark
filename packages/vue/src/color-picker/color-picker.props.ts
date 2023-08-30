import type { Context } from '@zag-js/color-picker'
import type { PropType } from 'vue'

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
  onChange: {
    type: Function as PropType<Context['onChange']>,
  },
  onChangeEnd: {
    type: Function as PropType<Context['onChangeEnd']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
  },
  value: {
    type: String as PropType<Context['value']>,
  },
}
