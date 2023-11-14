import type { ItemPreviewProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreview = forwardRef<HTMLImageElement, FileUploadItemPreviewProps>(
  (props, ref) => {
    const api = useFileUploadContext()
    const itemProps = useFileUploadItemContext() as ItemPreviewProps

    try {
      const mergedProps = mergeProps(api.getItemPreviewProps(itemProps), props)

      return <ark.img {...mergedProps} ref={ref} />
    } catch (e) {
      return null
    }
  },
)

FileUploadItemPreview.displayName = 'FileUploadItemPreview'
