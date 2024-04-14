import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadDropzoneProps extends HTMLArkProps<'div'> {}

export const FileUploadDropzone = defineComponent<FileUploadDropzoneProps>(
  (_, { attrs, slots }) => {
    const api = useFileUploadContext()

    return () => (
      <>
        <ark.div {...api.value.dropzoneProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
  {
    name: 'FileUploadDropzone',
  },
)
