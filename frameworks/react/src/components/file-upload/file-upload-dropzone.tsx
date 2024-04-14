import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadDropzoneProps extends HTMLArkProps<'div'> {}

export const FileUploadDropzone = forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  (props, ref) => {
    const fileUpload = useFileUploadContext()
    const mergedProps = mergeProps(fileUpload.dropzoneProps, props)

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...fileUpload.hiddenInputProps} />
      </>
    )
  },
)

FileUploadDropzone.displayName = 'FileUploadDropzone'
