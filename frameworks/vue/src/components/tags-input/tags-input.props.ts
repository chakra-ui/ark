import type { Context } from '@zag-js/tags-input'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils/utils'

export const props = {
  addOnPaste: {
    type: Boolean as PropType<Context['addOnPaste']>,
    default: undefined,
  },
  allowEditTag: {
    type: Boolean as PropType<Context['allowEditTag']>,
    default: undefined,
  },
  allowOverflow: {
    type: Boolean as PropType<Context['allowOverflow']>,
    default: undefined,
  },
  autoFocus: {
    type: Boolean as PropType<Context['autoFocus']>,
    default: undefined,
  },
  blurBehavior: {
    type: String as PropType<Context['blurBehavior']>,
  },
  delimiter: {
    type: String as PropType<Context['delimiter']>,
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
  inputValue: {
    type: String as PropType<Context['inputValue']>,
  },
  invalid: {
    type: Boolean as PropType<Context['invalid']>,
    default: undefined,
  },
  max: {
    type: Number as PropType<Context['max']>,
  },
  maxLength: {
    type: Number as PropType<Context['maxLength']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
    default: undefined,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  validate: {
    type: Function as PropType<Context['validate']>,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
}
export const emits = declareEmits([
  'highlight-change',
  'value-change',
  'value-invalid',
  'update:modelValue',
])
