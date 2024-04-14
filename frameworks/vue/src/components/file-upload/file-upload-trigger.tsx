import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadTriggerProps extends HTMLArkProps<'button'> {}

export const FileUploadTrigger = defineComponent<FileUploadTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useFileUploadContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'FileUploadTrigger',
  },
)
