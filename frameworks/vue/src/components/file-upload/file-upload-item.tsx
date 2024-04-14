import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { type FileUploadItemContext, FileUploadItemProvider } from './file-upload-item-context'

export interface FileUploadItemProps extends Assign<HTMLArkProps<'li'>, FileUploadItemContext> {}

export const FileUploadItem = defineComponent<FileUploadItemProps>(
  (props, { slots, attrs }) => {
    const api = useFileUploadContext()
    FileUploadItemProvider(props)

    return () => (
      <ark.li {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(api.value.getItemProps(props))}
      </ark.li>
    )
  },
  {
    name: 'FileUploadItem',
    props: {
      file: {
        type: Object as PropType<FileUploadItemContext['file']>,
        required: true,
      },
    },
  },
)
