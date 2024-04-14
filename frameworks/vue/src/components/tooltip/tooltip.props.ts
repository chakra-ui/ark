import type { Context } from '@zag-js/tooltip'
import type { PropType } from 'vue'
import { declareEmits } from '~/utils/utils'

export const props = {
  'aria-label': {
    type: String as PropType<Context['aria-label']>,
  },
  closeDelay: {
    type: Number as PropType<Context['closeDelay']>,
  },
  closeOnEsc: {
    type: Boolean as PropType<Context['closeOnEsc']>,
    default: undefined,
  },
  closeOnPointerDown: {
    type: Boolean as PropType<Context['closeOnPointerDown']>,
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
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  interactive: {
    type: Boolean as PropType<Context['interactive']>,
    default: undefined,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
    default: undefined,
  },
  openDelay: {
    type: Number as PropType<Context['openDelay']>,
  },
  positioning: {
    type: Object as PropType<Context['positioning']>,
  },
}
export const emits = declareEmits(['open-change'])
