import type { ItemProps } from '@zag-js/file-upload'
import { computed, defineComponent } from 'vue'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useFileUploadContext } from './file-upload-context'
import { FileUploadItemProvider } from './file-upload-item-context'

export interface FileUploadItemProps extends Assign<typeof ark.li, ItemProps> {}

export const FileUploadItem = defineComponent({
  name: 'FileUploadItem',
  props: {
    file: {
      type: Object as () => File,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useFileUploadContext()
    FileUploadItemProvider(computed(() => ({ ...props, ...api.value.getItemProps(props) })))

    return () => (
      <ark.li {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(api.value.getItemProps(props))}
      </ark.li>
    )
  },
})
