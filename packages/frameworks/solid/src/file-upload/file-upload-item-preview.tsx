import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

interface ElementProps {
  /**
   * The file type to match against. Matches all file types by default.
   * @default '.*'
   */
  type?: string
}

export interface FileUploadItemPreviewProps extends HTMLArkProps<'div'>, ElementProps {}

export const FileUploadItemPreview = (props: FileUploadItemPreviewProps) => {
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const mergedProps = mergeProps(() => api().getItemPreviewProps(item), props)

  if (!item.file.type.match(props.type ?? '.*')) return null

  return <ark.div {...mergedProps} />
}
