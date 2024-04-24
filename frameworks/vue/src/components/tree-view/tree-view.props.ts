import type { Context } from '@zag-js/tree-view'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils'

export const props = {
  dir: {
    type: String as PropType<Context['dir']>,
  },
  expandedValue: {
    type: Object as PropType<Context['expandedValue']>,
  },
  focusedValue: {
    type: String as PropType<Context['focusedValue']>,
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
    type: Object as PropType<Context['selectedValue']>,
  },
  selectionMode: {
    type: String as PropType<Context['selectionMode']>,
    default: 'single',
  },
  defaultFocusedValue: {
    type: String as PropType<Context['focusedValue']>,
  },
} as const
export const emits = declareEmits(['focus-change', 'expanded-change', 'selection-change'])
