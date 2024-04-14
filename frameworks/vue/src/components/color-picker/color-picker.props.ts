import type { Context } from '@zag-js/color-picker'
import type { PropType } from 'vue'
import { declareEmits } from '~/utils/utils'

export const props = {
  closeOnSelect: {
    type: Boolean as PropType<Context['closeOnSelect']>,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  format: {
    type: String as PropType<Context['format']>,
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
  initialFocusEl: {
    type: Object as PropType<Context['initialFocusEl']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
    default: undefined,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
    default: undefined,
  },
  modelValue: {
    type: String,
  },
}
export const emits = declareEmits([
  'format-change',
  'open-change',
  'value-change',
  'value-change-end',
  'update:modelValue',
])
