import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

export interface FileUploadItemDeleteTriggerProps extends HTMLArkProps<'button'> {}

export const FileUploadItemDeleteTrigger = defineComponent<FileUploadItemDeleteTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useFileUploadContext()
    const item = useFileUploadItemContext()

    return () => (
      <ark.div {...api.value.getItemDeleteTriggerProps(item)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'FileUploadItemDeleteTrigger',
  },
)
