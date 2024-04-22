import type { Context } from '@zag-js/carousel'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils'

export const props = {
  align: {
    type: String as PropType<Context['align']>,
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
  index: {
    type: Number as PropType<Context['index']>,
  },
  loop: {
    type: Boolean as PropType<Context['loop']>,
    default: undefined,
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
    default: 'horizontal',
  },
  slidesPerView: {
    type: Number as PropType<Context['slidesPerView']>,
  },
  spacing: {
    type: String as PropType<Context['spacing']>,
  },
} as const
export const emits = declareEmits(['index-change'])
