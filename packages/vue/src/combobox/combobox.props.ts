import type { Context } from '@zag-js/combobox'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  allowCustomValue: {
    type: Boolean as PropType<Context['allowCustomValue']>,
  },
  ariaHidden: {
    type: Boolean as PropType<Context['ariaHidden']>,
  },
  autoFocus: {
    type: Boolean as PropType<Context['autoFocus']>,
  },
  blurOnSelect: {
    type: Boolean as PropType<Context['blurOnSelect']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
  },
  focusOnClear: {
    type: Boolean as PropType<Context['focusOnClear']>,
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
  inputBehavior: {
    type: String as PropType<Context['inputBehavior']>,
  },
  inputValue: {
    type: String as PropType<Context['inputValue']>,
  },
  invalid: {
    type: Boolean as PropType<Context['invalid']>,
  },
  isCustomValue: {
    type: Function as PropType<Context['isCustomValue']>,
  },
  loop: {
    type: Boolean as PropType<Context['loop']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  openOnClick: {
    type: Boolean as PropType<Context['openOnClick']>,
  },
  placeholder: {
    type: String as PropType<Context['placeholder']>,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
  readOnly: {
    type: Boolean as PropType<Context['readOnly']>,
  },
  selectOnTab: {
    type: Boolean as PropType<Context['selectOnTab']>,
  },
  selectionBehavior: {
    type: String as PropType<Context['selectionBehavior']>,
  },
  selectionData: {
    type: Object as PropType<Context['selectionData']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
}
export const emits = declareEmits([
  'close',
  'focusOutside',
  'highlight',
  'inputChange',
  'interactOutside',
  'open',
  'pointerDownOutside',
  'select',
])
