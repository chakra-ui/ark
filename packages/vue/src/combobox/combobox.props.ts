import type { Context } from '@zag-js/combobox'
import type { PropType } from 'vue'

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
  onClose: {
    type: Function as PropType<Context['onClose']>,
  },
  onFocusOutside: {
    type: Function as PropType<Context['onFocusOutside']>,
  },
  onHighlight: {
    type: Function as PropType<Context['onHighlight']>,
  },
  onInputChange: {
    type: Function as PropType<Context['onInputChange']>,
  },
  onInteractOutside: {
    type: Function as PropType<Context['onInteractOutside']>,
  },
  onOpen: {
    type: Function as PropType<Context['onOpen']>,
  },
  onPointerDownOutside: {
    type: Function as PropType<Context['onPointerDownOutside']>,
  },
  onSelect: {
    type: Function as PropType<Context['onSelect']>,
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
