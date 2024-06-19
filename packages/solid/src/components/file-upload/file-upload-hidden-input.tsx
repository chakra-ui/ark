import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface FileUploadHiddenInputProps
  extends HTMLProps<'input'>,
    FileUploadHiddenInputBaseProps {}

export const FileUploadHiddenInput = (props: FileUploadHiddenInputProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
