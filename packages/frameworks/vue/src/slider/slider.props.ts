import type { Context } from '@zag-js/slider'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  'aria-label': {
    type: String as PropType<Context['aria-label']>,
  },
  'aria-labelledby': {
    type: String as PropType<Context['aria-labelledby']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  focusThumbOnChange: {
    type: Boolean as PropType<Context['focusThumbOnChange']>,
    default: undefined,
  },
  form: {
    type: String as PropType<Context['form']>,
  },
  getAriaValueText: {
    type: Function as PropType<Context['getAriaValueText']>,
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
  max: {
    type: Number as PropType<Context['max']>,
  },
  min: {
    type: Number as PropType<Context['min']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  origin: {
    type: String as PropType<Context['origin']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
    default: undefined,
  },
  step: {
    type: Number as PropType<Context['step']>,
  },
  thumbAlignment: {
    type: String as PropType<Context['thumbAlignment']>,
  },
  thumbSize: {
    type: Object as PropType<Context['thumbSize']>,
  },
  modelValue: {
    type: Number as PropType<Context['value']>,
  },
}
export const emits = declareEmits([
  'value-change',
  'value-change-end',
  'value-change-start',
  'update:modelValue',
])
