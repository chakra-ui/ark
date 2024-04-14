import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

export interface FileUploadItemSizeTextProps extends HTMLArkProps<'div'> {}

export const FileUploadItemSizeText = (props: FileUploadItemSizeTextProps) => {
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const mergedProps = mergeProps(() => api().getItemSizeTextProps(item), props)

  return <ark.div {...mergedProps}>{props.children || api().getFileSize(item.file)}</ark.div>
}
