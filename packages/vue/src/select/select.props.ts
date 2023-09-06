import type { Context } from '@zag-js/select'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  closeOnSelect: {
    type: Boolean as PropType<Context['closeOnSelect']>,
    default: undefined,
  },
  collection: {
    type: Object as PropType<Context['collection']>,
    required: true,
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
  highlightedValue: {
    type: String as PropType<Context['highlightedValue']>,
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
  loop: {
    type: Boolean as PropType<Context['loop']>,
  },
  multiple: {
    type: Boolean as PropType<Context['multiple']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
  },
  selectOnBlur: {
    type: Boolean as PropType<Context['selectOnBlur']>,
  },
  modelValue: {
    type: Array as PropType<Context['value']>,
  },
} as const

export const emits = declareEmits([
  'change',
  'close',
  'focus-outside',
  'highlight',
  'interact-outside',
  'open',
  'pointer-down-outside',
  'update:modelValue',
])
