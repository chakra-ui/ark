import type { ItemPreviewProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreview = (props: FileUploadItemPreviewProps) => {
  const api = useFileUploadContext()
  const itemProps = useFileUploadItemContext() as ItemPreviewProps

  try {
    const mergedProps = mergeProps(() => api().getItemPreviewProps(itemProps), props)

    return <ark.img {...mergedProps} />
  } catch (e) {
    return null
  }
}
