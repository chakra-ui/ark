import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemNameProps extends HTMLArkProps<'div'> {}

export const FileUploadItemName = defineComponent<FileUploadItemNameProps>(
  (_, { slots, attrs }) => {
    const api = useFileUploadContext()
    const itemProps = useFileUploadItemPropsContext()

    return () => (
      <ark.div {...api.value.getItemNameProps(itemProps.value)} {...attrs}>
        {slots.default?.() || itemProps.value.file.name}
      </ark.div>
    )
  },
  {
    name: 'FileUploadItemName',
  },
)
