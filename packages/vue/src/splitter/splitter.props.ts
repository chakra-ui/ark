import type { Context } from '@zag-js/splitter'
import type { PropType } from 'vue'

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
  onResize: {
    type: Function as PropType<Context['onResize']>,
  },
  onResizeEnd: {
    type: Function as PropType<Context['onResizeEnd']>,
  },
  onResizeStart: {
    type: Function as PropType<Context['onResizeStart']>,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  size: {
    type: Array as PropType<Context['size']>,
  },
}
