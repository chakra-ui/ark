import type { Context } from '@zag-js/avatar'
import type { PropType } from 'vue'

export const props = {
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  onError: {
    type: Function as PropType<Context['onError']>,
  },
  onLoad: {
    type: Function as PropType<Context['onLoad']>,
  },
}
