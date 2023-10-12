import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadDropzoneProps extends HTMLArkProps<'div'> {}

export const FileUploadDropzone = forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  (props, ref) => {
    const api = useFileUploadContext()
    const mergedProps = mergeProps(api.dropzoneProps, props)

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...api.hiddenInputProps} />
      </>
    )
  },
)

FileUploadDropzone.displayName = 'FileUploadDropzone'
