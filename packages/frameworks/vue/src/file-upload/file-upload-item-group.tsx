import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadItemGroupProps extends HTMLArkProps<'ul'> {}

export const FileUploadItemGroup = defineComponent({
  name: 'FileUploadItemGroup',
  setup(_, { slots, attrs }) {
    const api = useFileUploadContext()

    return () => (
      <ark.ul {...api.value.itemGroupProps} {...attrs}>
        {slots?.default?.(api.value.files)}
      </ark.ul>
    )
  },
})
