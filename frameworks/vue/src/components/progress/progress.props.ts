import type { Context } from '@zag-js/progress'
import type { PropType } from 'vue'
import { declareEmits } from '~/utils/utils'

export const props = {
  dir: {
    type: String as PropType<Context['dir']>,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  max: {
    type: Number as PropType<Context['max']>,
  },
  min: {
    type: Number as PropType<Context['min']>,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  modelValue: {
    type: Number as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['value-change', 'update:modelValue'])
