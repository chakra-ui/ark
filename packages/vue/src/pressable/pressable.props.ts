import type { Context } from '@zag-js/pressable'
import type { PropType } from 'vue'

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
  onLongPress: {
    type: Function as PropType<Context['onLongPress']>,
  },
  onPress: {
    type: Function as PropType<Context['onPress']>,
  },
  onPressEnd: {
    type: Function as PropType<Context['onPressEnd']>,
  },
  onPressStart: {
    type: Function as PropType<Context['onPressStart']>,
  },
  onPressUp: {
    type: Function as PropType<Context['onPressUp']>,
  },
  preventFocusOnPress: {
    type: Boolean as PropType<Context['preventFocusOnPress']>,
  },
}
