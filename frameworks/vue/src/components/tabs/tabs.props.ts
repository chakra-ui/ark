import type { Context } from '@zag-js/tabs'
import type { PropType } from 'vue'
import { declareEmits } from '~/utils/utils'

export const props = {
  activationMode: {
    type: String as PropType<Context['activationMode']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
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
  loop: {
    type: Boolean as PropType<Context['loop']>,
    default: undefined,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  modelValue: {
    type: String as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['focus-change', 'value-change', 'update:modelValue'])
