import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemNameProps extends HTMLArkProps<'div'> {}

export const FileUploadItemName = (props: FileUploadItemNameProps) => {
  const api = useFileUploadContext()
  const itemProps = useFileUploadItemContext()
  const mergedProps = mergeProps(() => api().getItemNameProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
