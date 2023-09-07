import type { Context } from '@zag-js/combobox'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  allowCustomValue: {
    type: Boolean as PropType<Context['allowCustomValue']>,
    default: undefined,
  },
  ariaHidden: {
    type: Boolean as PropType<Context['ariaHidden']>,
    default: undefined,
  },
  autoFocus: {
    type: Boolean as PropType<Context['autoFocus']>,
    default: undefined,
  },
  blurOnSelect: {
    type: Boolean as PropType<Context['blurOnSelect']>,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  focusOnClear: {
    type: Boolean as PropType<Context['focusOnClear']>,
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
  isCustomValue: {
    type: Function as PropType<Context['isCustomValue']>,
  },
  loop: {
    type: Boolean as PropType<Context['loop']>,
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
  selectOnTab: {
    type: Boolean as PropType<Context['selectOnTab']>,
    default: undefined,
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
  'focus-outside',
  'highlight',
  'input-change',
  'interact-outside',
  'open',
  'pointer-down-outside',
  'select',
])
