import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewProps extends HTMLArkProps<'div'> {
  /**
   * The file type to match against. Matches all file types by default.
   * @default '.*'
   */
  type?: string
}

export const FileUploadItemPreview = defineComponent<FileUploadItemPreviewProps>(
  (props, { attrs, slots }) => {
    const api = useFileUploadContext()
    const item = useFileUploadItemContext()

    return () =>
      !item.file.type.match(props.type ?? '.*') ? null : (
        <ark.div {...api.value.getItemPreviewProps(item)} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'FileUploadItemPreview',
    props: {
      type: {
        type: String,
        default: '.*',
      },
    },
  },
)
