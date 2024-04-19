import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

export interface FileUploadItemSizeTextProps extends HTMLArkProps<'div'> {}

export const FileUploadItemSizeText = defineComponent<FileUploadItemSizeTextProps>(
  (_, { slots, attrs }) => {
    const api = useFileUploadContext()
    const item = useFileUploadItemContext()

    return () => (
      <ark.div {...api.value.getItemSizeTextProps(item)} {...attrs}>
        {slots.default?.() || api.value.getFileSize(item.file)}
      </ark.div>
    )
  },
  {
    name: 'FileUploadItemSizeText',
  },
)
