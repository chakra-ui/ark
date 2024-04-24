import type { Context } from '@zag-js/pagination'
import type { PropType } from 'vue'
import { declareEmits } from '../../utils'

export const props = {
  count: {
    type: Number as PropType<Context['count']>,
    required: true,
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
  page: {
    type: Number as PropType<Context['page']>,
  },
  pageSize: {
    type: Number as PropType<Context['pageSize']>,
  },
  siblingCount: {
    type: Number as PropType<Context['siblingCount']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  type: {
    type: String as PropType<Context['type']>,
  },
} as const
export const emits = declareEmits(['page-change'])
