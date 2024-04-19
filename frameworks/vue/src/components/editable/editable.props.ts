import type { Context } from '@zag-js/editable'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils'

export const props = {
  activationMode: {
    type: String as PropType<Context['activationMode']>,
  },
  autoResize: {
    type: Boolean as PropType<Context['autoResize']>,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  finalFocusEl: {
    type: Function as PropType<Context['finalFocusEl']>,
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
  maxLength: {
    type: Number as PropType<Context['maxLength']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  placeholder: {
    type: String as PropType<Context['placeholder']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
    default: undefined,
  },
  selectOnFocus: {
    type: Boolean as PropType<Context['selectOnFocus']>,
    default: undefined,
  },
  startWithEditView: {
    type: Boolean as PropType<Context['startWithEditView']>,
    default: undefined,
  },
  submitMode: {
    type: String as PropType<Context['submitMode']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  modelValue: {
    type: String as PropType<Context['value']>,
  },
}
export const emits = declareEmits([
  'edit',
  'value-change',
  'value-commit',
  'value-revert',
  'update:modelValue',
])
