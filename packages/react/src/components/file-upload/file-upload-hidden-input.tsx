import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadHiddenInputProps extends HTMLArkProps<'input'> {}

export const FileUploadHiddenInput = forwardRef<HTMLInputElement, FileUploadHiddenInputProps>(
  (props, ref) => {
    const fileUpload = useFileUploadContext()
    const mergedProps = mergeProps(fileUpload.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

FileUploadHiddenInput.displayName = 'FileUploadHiddenInput'
