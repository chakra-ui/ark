import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

export interface FileUploadItemPreviewProps extends HTMLArkProps<'div'> {
  /**
   * The file type to match against. Matches all file types by default.
   * @default '.*'
   */
  type?: string
}

export const FileUploadItemPreview = forwardRef<HTMLImageElement, FileUploadItemPreviewProps>(
  (props, ref) => {
    const context = useFileUploadContext()
    const itemContext = useFileUploadItemContext()
    const mergedProps = mergeProps(context.getItemPreviewProps(itemContext), props)

    if (!itemContext.file.type.match(props.type ?? '.*')) return null

    return <ark.div {...mergedProps} ref={ref} />
  },
)

FileUploadItemPreview.displayName = 'FileUploadItemPreview'
