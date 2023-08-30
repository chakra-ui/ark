import type { Context } from '@zag-js/editable'
import type { PropType } from 'vue'

export const props = {
  activationMode: {
    type: String as PropType<Context['activationMode']>,
  },
  autoResize: {
    type: Boolean as PropType<Context['autoResize']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
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
  },
  maxLength: {
    type: Number as PropType<Context['maxLength']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  onCancel: {
    type: Function as PropType<Context['onCancel']>,
  },
  onChange: {
    type: Function as PropType<Context['onChange']>,
  },
  onEdit: {
    type: Function as PropType<Context['onEdit']>,
  },
  onFocusOutside: {
    type: Function as PropType<Context['onFocusOutside']>,
  },
  onInteractOutside: {
    type: Function as PropType<Context['onInteractOutside']>,
  },
  onPointerDownOutside: {
    type: Function as PropType<Context['onPointerDownOutside']>,
  },
  onSubmit: {
    type: Function as PropType<Context['onSubmit']>,
  },
  placeholder: {
    type: String as PropType<Context['placeholder']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
  },
  selectOnFocus: {
    type: Boolean as PropType<Context['selectOnFocus']>,
  },
  startWithEditView: {
    type: Boolean as PropType<Context['startWithEditView']>,
  },
  submitMode: {
    type: String as PropType<Context['submitMode']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  value: {
    type: String as PropType<Context['value']>,
  },
}
