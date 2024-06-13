import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export type FileUploadItemGroupBaseProps = {}
export interface FileUploadItemGroupProps
  extends HTMLArkProps<'ul'>,
    FileUploadItemGroupBaseProps {}

export const FileUploadItemGroup = forwardRef<HTMLUListElement, FileUploadItemGroupProps>(
  (props, ref) => {
    const fileUpload = useFileUploadContext()
    const mergedProps = mergeProps(fileUpload.getItemGroupProps(), props)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

FileUploadItemGroup.displayName = 'FileUploadItemGroup'
