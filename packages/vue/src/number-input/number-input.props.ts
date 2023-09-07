import type { Context } from '@zag-js/number-input'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  allowMouseWheel: {
    type: Boolean as PropType<Context['allowMouseWheel']>,
    default: undefined,
  },
  allowOverflow: {
    type: Boolean as PropType<Context['allowOverflow']>,
    default: undefined,
  },
  clampValueOnBlur: {
    type: Boolean as PropType<Context['clampValueOnBlur']>,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  focusInputOnChange: {
    type: Boolean as PropType<Context['focusInputOnChange']>,
    default: undefined,
  },
  form: {
    type: String as PropType<Context['form']>,
  },
  format: {
    type: Function as PropType<Context['format']>,
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
  inputMode: {
    type: String as PropType<Context['inputMode']>,
  },
  invalid: {
    type: Boolean as PropType<Context['invalid']>,
    default: undefined,
  },
  max: {
    type: Number as PropType<Context['max']>,
  },
  maxFractionDigits: {
    type: Number as PropType<Context['maxFractionDigits']>,
  },
  min: {
    type: Number as PropType<Context['min']>,
  },
  minFractionDigits: {
    type: Number as PropType<Context['minFractionDigits']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  parse: {
    type: Function as PropType<Context['parse']>,
  },
  pattern: {
    type: String as PropType<Context['pattern']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
    default: undefined,
  },
  spinOnPress: {
    type: Boolean as PropType<Context['spinOnPress']>,
    default: undefined,
  },
  step: {
    type: Number as PropType<Context['step']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  validateCharacter: {
    type: Function as PropType<Context['validateCharacter']>,
  },
  modelValue: {
    type: String as PropType<Context['value']>,
  },
}
export const emits = declareEmits(['blur', 'change', 'focus', 'invalid', 'update:modelValue'])
