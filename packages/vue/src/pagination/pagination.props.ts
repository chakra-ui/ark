import type { Context } from '@zag-js/pagination'
import type { PropType } from 'vue'

export const props = {
  count: {
    type: Number as PropType<Context['count']>,
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
  onChange: {
    type: Function as PropType<Context['onChange']>,
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
}
