import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadHiddenInputProps extends HTMLArkProps<'input'> {}

export const FileUploadHiddenInput = (props: FileUploadHiddenInputProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}
