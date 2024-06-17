import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface FileUploadHiddenInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    FileUploadHiddenInputBaseProps {}

export const FileUploadHiddenInput = (props: FileUploadHiddenInputProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
