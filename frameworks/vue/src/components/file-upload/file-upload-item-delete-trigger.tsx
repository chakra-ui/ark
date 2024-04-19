import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemDeleteTriggerProps extends HTMLArkProps<'button'> {}

export const FileUploadItemDeleteTrigger = defineComponent<FileUploadItemDeleteTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useFileUploadContext()
    const itemProps = useFileUploadItemPropsContext()

    return () => (
      <ark.div {...api.value.getItemDeleteTriggerProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'FileUploadItemDeleteTrigger',
  },
)
