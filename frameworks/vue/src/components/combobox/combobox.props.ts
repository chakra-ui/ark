import type { Context } from '@zag-js/combobox'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils/utils'

export const props = {
  allowCustomValue: {
    type: Boolean as PropType<Context['allowCustomValue']>,
    default: undefined,
  },
  autoFocus: {
    type: Boolean as PropType<Context['autoFocus']>,
    default: undefined,
  },
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
  form: {
    type: String as PropType<Context['form']>,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  highlightedValue: {
    type: String as PropType<Context['highlightedValue']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  inputBehavior: {
    type: String as PropType<Context['inputBehavior']>,
  },
  inputValue: {
    type: String as PropType<Context['inputValue']>,
  },
  invalid: {
    type: Boolean as PropType<Context['invalid']>,
    default: undefined,
  },
  loop: {
    type: Boolean as PropType<Context['loop']>,
    default: undefined,
  },
  multiple: {
    type: Boolean as PropType<Context['multiple']>,
    default: undefined,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  openOnClick: {
    type: Boolean as PropType<Context['openOnClick']>,
    default: undefined,
  },
  placeholder: {
    type: String as PropType<Context['placeholder']>,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
    default: undefined,
  },
  selectOnBlur: {
    type: Boolean as PropType<Context['selectOnBlur']>,
    default: undefined,
  },
  selectionBehavior: {
    type: String as PropType<Context['selectionBehavior']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
}
export const emits = declareEmits([
  'highlight-change',
  'input-value-change',
  'open-change',
  'value-change',
  'update:modelValue',
])
