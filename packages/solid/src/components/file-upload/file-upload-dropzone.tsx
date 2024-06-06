import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadDropzoneProps extends HTMLArkProps<'div'> {}

export const FileUploadDropzone = (props: FileUploadDropzoneProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getDropzoneProps(), props)

  return <ark.div {...mergedProps} />
}
