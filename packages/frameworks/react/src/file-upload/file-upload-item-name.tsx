import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemNameProps extends HTMLArkProps<'div'> {}

export const FileUploadItemName = forwardRef<HTMLDivElement, FileUploadItemNameProps>(
  (props, ref) => {
    const api = useFileUploadContext()
    const itemProps = useFileUploadItemContext()
    const mergedProps = mergeProps(api.getItemNameProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

FileUploadItemName.displayName = 'FileUploadItemName'
