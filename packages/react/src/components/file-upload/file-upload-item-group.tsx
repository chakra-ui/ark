import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadItemGroupBaseProps extends PolymorphicProps {}
export interface FileUploadItemGroupProps extends HTMLProps<'ul'>, FileUploadItemGroupBaseProps {}

export const FileUploadItemGroup = forwardRef<HTMLUListElement, FileUploadItemGroupProps>(
  (props, ref) => {
    const fileUpload = useFileUploadContext()
    const mergedProps = mergeProps(fileUpload.getItemGroupProps(), props)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

FileUploadItemGroup.displayName = 'FileUploadItemGroup'
