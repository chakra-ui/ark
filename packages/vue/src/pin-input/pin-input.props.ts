import type { Context } from '@zag-js/pin-input'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  autoFocus: {
    type: Boolean as PropType<Context['autoFocus']>,
  },
  blurOnComplete: {
    type: Boolean as PropType<Context['blurOnComplete']>,
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
  mask: {
    type: Boolean as PropType<Context['mask']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  otp: {
    type: Boolean as PropType<Context['otp']>,
  },
  pattern: {
    type: String as PropType<Context['pattern']>,
  },
  placeholder: {
    type: String as PropType<Context['placeholder']>,
  },
  selectOnFocus: {
    type: Boolean as PropType<Context['selectOnFocus']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  type: {
    type: String as PropType<Context['type']>,
  },
  value: {
    type: Array as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['change', 'complete', 'invalid'])
