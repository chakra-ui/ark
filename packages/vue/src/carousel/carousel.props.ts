import type { Context } from '@zag-js/carousel'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

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
  },
  orientation: {
    type: String as PropType<Context['orientation']>,
  },
  slidesPerView: {
    type: String as PropType<Context['slidesPerView']>,
  },
  spacing: {
    type: String as PropType<Context['spacing']>,
  },
}
export const emits = declareEmits(['slide-change'])
