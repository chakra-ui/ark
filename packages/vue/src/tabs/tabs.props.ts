import type { Context } from '@zag-js/tabs'
import type { PropType } from 'vue'

export const props = {
  activationMode: {
    type: String as PropType<Context['activationMode']>,
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
  loop: {
    type: Boolean as PropType<Context['loop']>,
  },
  onChange: {
    type: Function as PropType<Context['onChange']>,
  },
  onDelete: {
    type: Function as PropType<Context['onDelete']>,
  },
  onFocus: {
    type: Function as PropType<Context['onFocus']>,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  value: {
    type: String as PropType<Context['value']>,
  },
}
