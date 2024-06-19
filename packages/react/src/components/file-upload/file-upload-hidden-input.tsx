import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadHiddenInputBaseProps extends PolymorphicProps {}
export interface FileUploadHiddenInputProps
  extends HTMLProps<'input'>,
    FileUploadHiddenInputBaseProps {}

export const FileUploadHiddenInput = forwardRef<HTMLInputElement, FileUploadHiddenInputProps>(
  (props, ref) => {
    const fileUpload = useFileUploadContext()
    const mergedProps = mergeProps(fileUpload.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

FileUploadHiddenInput.displayName = 'FileUploadHiddenInput'
