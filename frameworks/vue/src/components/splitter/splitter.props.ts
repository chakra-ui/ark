import type { Context } from '@zag-js/splitter'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils/utils'

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
  ids: {
    type: Object as PropType<Context['ids']>,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  size: {
    type: Array as PropType<Context['size']>,
  },
}
export const emits = declareEmits(['size-change', 'size-change-end'])
