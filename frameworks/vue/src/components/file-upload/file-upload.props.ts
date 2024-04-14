import type { Context } from '@zag-js/file-upload'
import type { PropType } from 'vue'
import { declareEmits } from '~/utils/utils'

export const props = {
  accept: {
    type: String as PropType<Context['accept']>,
  },
  allowDrop: {
    type: Boolean as PropType<Context['allowDrop']>,
    default: undefined,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
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
  locale: {
    type: String as PropType<Context['locale']>,
  },
  maxFileSize: {
    type: Number as PropType<Context['maxFileSize']>,
  },
  maxFiles: {
    type: Number as PropType<Context['maxFiles']>,
  },
  minFileSize: {
    type: Number as PropType<Context['minFileSize']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
  translations: {
    type: Object as PropType<Context['translations']>,
  },
  validate: {
    type: Function as PropType<Context['validate']>,
  },
}
export const emits = declareEmits(['file-accept', 'file-reject', 'files-change'])
