import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

export interface FileUploadItemSizeTextProps extends HTMLArkProps<'div'> {}

export const FileUploadItemSizeText = forwardRef<HTMLDivElement, FileUploadItemSizeTextProps>(
  (props, ref) => {
    const { children, ...rest } = props
    const context = useFileUploadContext()
    const itemContext = useFileUploadItemContext()
    const mergedProps = mergeProps(context.getItemSizeTextProps(itemContext), rest)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {children || context.getFileSize(itemContext.file)}
      </ark.div>
    )
  },
)

FileUploadItemSizeText.displayName = 'FileUploadItemSizeText'
