import type { Context } from '@zag-js/hover-card'
import type { PropType } from 'vue'

export const props = {
  closeDelay: {
    type: Number as PropType<Context['closeDelay']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
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
  onClose: {
    type: Object as PropType<Context['onClose']>,
  },
  onOpen: {
    type: Object as PropType<Context['onOpen']>,
  },
  open: {
    type: Boolean as PropType<Context['open']>,
  },
  openDelay: {
    type: Number as PropType<Context['openDelay']>,
  },
  positioning: {
    type: Any as PropType<Context['positioning']>,
  },
}
