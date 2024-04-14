import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadLabelProps extends HTMLArkProps<'label'> {}

export const FileUploadLabel = defineComponent<FileUploadLabelProps>(
  (_, { attrs, slots }) => {
    const api = useFileUploadContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'FileUploadLabel',
  },
)
