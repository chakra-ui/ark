import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemSizeTextProps extends HTMLArkProps<'div'> {}

export const FileUploadItemSizeText = defineComponent<FileUploadItemSizeTextProps>(
  (_, { slots, attrs }) => {
    const api = useFileUploadContext()
    const itemProps = useFileUploadItemPropsContext()

    return () => (
      <ark.div {...api.value.getItemSizeTextProps(itemProps.value)} {...attrs}>
        {slots.default?.() || api.value.getFileSize(itemProps.value.file)}
      </ark.div>
    )
  },
  {
    name: 'FileUploadItemSizeText',
  },
)
