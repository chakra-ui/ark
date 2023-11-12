import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useFileUploadContext } from './file-upload-context'
import { FileUploadItemProvider, type FileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemProps extends Assign<HTMLArkProps<'li'>, FileUploadItemContext> {}

export const FileUploadItem = defineComponent({
  name: 'FileUploadItem',
  props: {
    file: {
      type: Object as () => File,
      required: true,
    },
    url: {
      type: String,
      required: false,
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
