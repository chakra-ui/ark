import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadDropzoneBaseProps extends PolymorphicProps {}
export interface FileUploadDropzoneProps
  extends HTMLAttributes<HTMLDivElement>,
    FileUploadDropzoneBaseProps {}

export const FileUploadDropzone = forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  (props, ref) => {
    const fileUpload = useFileUploadContext()
    const mergedProps = mergeProps(fileUpload.getDropzoneProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

FileUploadDropzone.displayName = 'FileUploadDropzone'
