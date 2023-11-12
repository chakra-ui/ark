import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemSizeTextProps extends HTMLArkProps<'div'> {}

export const FileUploadItemSizeText = (props: FileUploadItemSizeTextProps) => {
  const api = useFileUploadContext()
  const itemProps = useFileUploadItemContext()
  const mergedProps = mergeProps(() => api().getItemSizeTextProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
