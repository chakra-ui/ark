import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewProps extends HTMLArkProps<'div'> {
  /**
   * The file type to match against. Matches all file types by default.
   * @default '.*'
   */
  type?: string
}

export const FileUploadItemPreview = (props: FileUploadItemPreviewProps) => {
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const mergedProps = mergeProps(() => api().getItemPreviewProps(item), props)

  if (!item.file.type.match(props.type ?? '.*')) return null

  return <ark.div {...mergedProps} />
}
