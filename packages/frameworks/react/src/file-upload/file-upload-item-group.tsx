import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadItemGroupProps extends HTMLArkProps<'ul'> {}

export const FileUploadItemGroup = forwardRef<HTMLUListElement, FileUploadItemGroupProps>(
  (props, ref) => {
    const context = useFileUploadContext()
    const mergedProps = mergeProps(context.itemGroupProps, props)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

FileUploadItemGroup.displayName = 'FileUploadItemGroup'
