import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemNameProps extends HTMLArkProps<'div'> {}

export const FileUploadItemName = forwardRef<HTMLDivElement, FileUploadItemNameProps>(
  (props, ref) => {
    const { children, ...rest } = props
    const api = useFileUploadContext()
    const item = useFileUploadItemContext()
    const mergedProps = mergeProps(api.getItemNameProps(item), rest)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {children || item.file.name}
      </ark.div>
    )
  },
)

FileUploadItemName.displayName = 'FileUploadItemName'
