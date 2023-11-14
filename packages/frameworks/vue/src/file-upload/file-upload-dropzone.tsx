import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadDropzoneProps extends HTMLArkProps<'div'> {}

export const FileUploadDropzone = defineComponent({
  name: 'FileUploadDropzone',
  setup(_, { attrs, slots }) {
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
})
