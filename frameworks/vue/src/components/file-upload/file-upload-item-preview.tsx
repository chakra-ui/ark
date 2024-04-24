import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

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
    const itemProps = useFileUploadItemPropsContext()

    return () =>
      !itemProps.file.type.match(props.type ?? '.*') ? null : (
        <ark.div {...api.value.getItemPreviewProps(itemProps)} {...attrs}>
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
