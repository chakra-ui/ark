import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadItemGroupBaseProps extends PolymorphicProps {}
export interface FileUploadItemGroupProps
  extends HTMLAttributes<HTMLUListElement>,
    FileUploadItemGroupBaseProps {}

export const FileUploadItemGroup = forwardRef<HTMLUListElement, FileUploadItemGroupProps>(
  (props, ref) => {
    const fileUpload = useFileUploadContext()
    const mergedProps = mergeProps(fileUpload.getItemGroupProps(), props)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

FileUploadItemGroup.displayName = 'FileUploadItemGroup'
