import type { Context } from '@zag-js/pin-input'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils/utils'

export const props = {
  autoFocus: {
    type: Boolean as PropType<Context['autoFocus']>,
    default: undefined,
  },
  blurOnComplete: {
    type: Boolean as PropType<Context['blurOnComplete']>,
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
  mask: {
    type: Boolean as PropType<Context['mask']>,
    default: undefined,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  otp: {
    type: Boolean as PropType<Context['otp']>,
    default: undefined,
  },
  pattern: {
    type: String as PropType<Context['pattern']>,
  },
  placeholder: {
    type: String as PropType<Context['placeholder']>,
  },
  selectOnFocus: {
    type: Boolean as PropType<Context['selectOnFocus']>,
    default: undefined,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  type: {
    type: String as PropType<Context['type']>,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
}
export const emits = declareEmits([
  'value-change',
  'value-complete',
  'value-invalid',
  'update:modelValue',
])
