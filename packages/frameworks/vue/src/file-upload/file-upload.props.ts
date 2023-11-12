import type { Context } from '@zag-js/file-upload'
import type { PropType } from 'vue'
import { declareEmits } from '../utils'

export const props = {
  accept: {
    type: Object as PropType<Context['accept']>,
  },
  allowDrop: {
    type: Boolean as PropType<Context['allowDrop']>,
  },
  dir: {
    type: String as PropType<Context['dir']>,
  },
  disabled: {
    type: Boolean as PropType<Context['disabled']>,
    default: undefined,
  },
  files: {
    type: Object as PropType<Context['files']>,
  },
  getRootNode: {
    type: Function as PropType<Context['getRootNode']>,
  },
  id: {
    type: String as PropType<Context['id']>,
  },
  maxFiles: {
    type: Number as PropType<Context['maxFiles']>,
  },
  maxFileSize: {
    type: Number as PropType<Context['maxFileSize']>,
  },
  minFileSize: {
    type: Number as PropType<Context['minFileSize']>,
  },
  name: {
    type: String as PropType<Context['name']>,
  },
}
export const emits = declareEmits(['files-change'])
