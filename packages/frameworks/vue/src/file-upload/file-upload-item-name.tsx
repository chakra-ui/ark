import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemNameProps extends HTMLArkProps<'div'> {}

export const FileUploadItemName = defineComponent({
  name: 'FileUploadItemName',
  setup(_, { slots, attrs }) {
    const api = useFileUploadContext()
    const item = useFileUploadItemContext()

    return () => (
      <ark.div {...api.value.getItemNameProps(item)} {...attrs}>
        {slots.default?.() || item.file.name}
      </ark.div>
    )
  },
})
