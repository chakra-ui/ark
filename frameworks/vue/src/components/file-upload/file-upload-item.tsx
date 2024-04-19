import type { ItemProps } from '@zag-js/file-upload'
import { type PropType, defineComponent, ref } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context'

export interface FileUploadItemProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const FileUploadItem = defineComponent<FileUploadItemProps>(
  (props, { slots, attrs }) => {
    const api = useFileUploadContext()
    FileUploadItemPropsProvider(props)

    return () => (
      <ark.li {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.li>
    )
  },
  {
    name: 'FileUploadItem',
    props: {
      file: {
        type: Object as PropType<FileUploadItemProps['file']>,
        required: true,
      },
    },
  },
)
