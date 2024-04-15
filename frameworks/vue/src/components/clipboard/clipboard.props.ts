import type { Context } from '@zag-js/clipboard'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils/utils'

export const props = {
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  timeout: {
    type: Number as PropType<Context['timeout']>,
  },
  value: {
    type: String as PropType<Context['value']>,
  },
}

export const emits = declareEmits(['status-change'])
