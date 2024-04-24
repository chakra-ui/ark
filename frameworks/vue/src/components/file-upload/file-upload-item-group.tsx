import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadItemGroupProps extends HTMLArkProps<'ul'> {}

export const FileUploadItemGroup = defineComponent<FileUploadItemGroupProps>(
  (_, { slots, attrs }) => {
    const api = useFileUploadContext()

    return () => (
      <ark.ul {...api.value.itemGroupProps} {...attrs}>
        {slots.default?.()}
      </ark.ul>
    )
  },
  {
    name: 'FileUploadItemGroup',
  },
)
