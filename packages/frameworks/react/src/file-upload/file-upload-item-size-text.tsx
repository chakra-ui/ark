import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemSizeTextProps extends HTMLArkProps<'div'> {}

export const FileUploadItemSizeText = forwardRef<HTMLDivElement, FileUploadItemSizeTextProps>(
  (props, ref) => {
    const { children, ...rest } = props
    const api = useFileUploadContext()
    const item = useFileUploadItemContext()
    const mergedProps = mergeProps(api.getItemSizeTextProps(item), rest)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {children || api.getFileSize(item.file)}
      </ark.div>
    )
  },
)

FileUploadItemSizeText.displayName = 'FileUploadItemSizeText'
