import type { Context } from '@zag-js/pressable'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  allowTextSelectionOnPress: {
    type: Boolean as PropType<Context['allowTextSelectionOnPress']>,
    default: undefined,
  },
  cancelOnPointerExit: {
    type: Boolean as PropType<Context['cancelOnPointerExit']>,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
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
    default: undefined,
  },
}
export const emits = declareEmits(['long-press', 'press', 'press-end', 'press-start', 'press-up'])
