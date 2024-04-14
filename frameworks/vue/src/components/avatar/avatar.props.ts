import type { Context } from '@zag-js/avatar'
import type { PropType } from 'vue'
import { declareEmits } from '~/utils/utils'

export const props = {
  dir: {
    type: String as PropType<Context['dir']>,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
} as const
export const emits = declareEmits(['loading-status-change'])
