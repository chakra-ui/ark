import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useFileUploadContext } from './file-upload-context'
import { FileUploadItemProvider, type FileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemProps extends Assign<HTMLArkProps<'li'>, FileUploadItemContext> {}

export const FileUploadItem = defineComponent({
  name: 'FileUploadItem',
  props: {
    file: {
      type: Object as PropType<FileUploadItemContext['file']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useFileUploadContext()
    FileUploadItemProvider(props)

    return () => (
      <ark.li {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(api.value.getItemProps(props))}
      </ark.li>
    )
  },
})
