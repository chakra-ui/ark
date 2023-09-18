import type { Context } from '@zag-js/avatar'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
}
export const emits = declareEmits(['loading-status-change'])
