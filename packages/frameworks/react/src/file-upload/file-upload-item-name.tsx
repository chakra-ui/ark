import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

export interface FileUploadItemNameProps extends HTMLArkProps<'div'> {}

export const FileUploadItemName = forwardRef<HTMLDivElement, FileUploadItemNameProps>(
  (props, ref) => {
    const { children, ...rest } = props
    const context = useFileUploadContext()
    const itemContext = useFileUploadItemContext()
    const mergedProps = mergeProps(context.getItemNameProps(itemContext), rest)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {children || itemContext.file.name}
      </ark.div>
    )
  },
)

FileUploadItemName.displayName = 'FileUploadItemName'
