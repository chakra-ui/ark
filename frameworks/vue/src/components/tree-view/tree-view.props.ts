import type { Context } from '@zag-js/tree-view'
import type { PropType } from 'vue'
import { declareEmits } from '~/utils/utils'

export const props = {
  dir: {
    type: String as PropType<Context['dir']>,
  },
  expandedIds: {
    type: Object as PropType<Context['expandedIds']>,
  },
  focusedId: {
    type: String as PropType<Context['focusedId']>,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  openOnClick: {
    type: Boolean as PropType<Context['openOnClick']>,
    default: true,
  },
  selectedIds: {
    type: Object as PropType<Context['selectedIds']>,
  },
  selectionMode: {
    type: String as PropType<Context['selectionMode']>,
    default: 'single',
  },
  defaultFocusedId: {
    type: String as PropType<Context['focusedId']>,
  },
} as const
export const emits = declareEmits(['focus-change', 'expanded-change', 'selection-change'])
