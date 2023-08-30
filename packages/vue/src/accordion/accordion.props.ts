import type { Context } from '@zag-js/accordion'
import type { PropType } from 'vue'

export const props = {
  collapsible: {
    type: Boolean as PropType<Context['collapsible']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
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
  multiple: {
    type: Boolean as PropType<Context['multiple']>,
  },
  onChange: {
    type: Function as PropType<Context['onChange']>,
  },
  onFocusChange: {
    type: Function as PropType<Context['onFocusChange']>,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  value: {
    type: Array as PropType<Context['value']>,
  },
}
