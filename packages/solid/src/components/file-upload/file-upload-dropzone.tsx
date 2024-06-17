import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadDropzoneBaseProps extends PolymorphicProps<'div'> {}
export interface FileUploadDropzoneProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    FileUploadDropzoneBaseProps {}

export const FileUploadDropzone = (props: FileUploadDropzoneProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getDropzoneProps(), props)

  return <ark.div {...mergedProps} />
}
