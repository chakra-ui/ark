import type { Context } from '@zag-js/pressable'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  allowTextSelectionOnPress: {
    type: Boolean as PropType<Context['allowTextSelectionOnPress']>,
  },
  cancelOnPointerExit: {
    type: Boolean as PropType<Context['cancelOnPointerExit']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  longPressDelay: {
    type: Number as PropType<Context['longPressDelay']>,
  },
  preventFocusOnPress: {
    type: Boolean as PropType<Context['preventFocusOnPress']>,
  },
}
export const emits = declareEmits(['longPress', 'press', 'pressEnd', 'pressStart', 'pressUp'])
