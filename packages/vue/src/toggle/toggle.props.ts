import type { Context } from '@zag-js/toggle'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  'aria-label': {
    type: String as PropType<Context['aria-label']>,
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
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  pressed: {
    type: Boolean as PropType<Context['pressed']>,
    default: undefined,
  },
}
export const emits = declareEmits(['change'])
