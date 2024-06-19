import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadDropzoneBaseProps extends PolymorphicProps<'div'> {}
export interface FileUploadDropzoneProps extends HTMLProps<'div'>, FileUploadDropzoneBaseProps {}

export const FileUploadDropzone = (props: FileUploadDropzoneProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getDropzoneProps(), props)

  return <ark.div {...mergedProps} />
}
