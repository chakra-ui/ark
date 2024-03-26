import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadDropzoneProps extends HTMLArkProps<'div'> {}

export const FileUploadDropzone = forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  (props, ref) => {
    const context = useFileUploadContext()
    const mergedProps = mergeProps(context.dropzoneProps, props)

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...context.hiddenInputProps} />
      </>
    )
  },
)

FileUploadDropzone.displayName = 'FileUploadDropzone'
