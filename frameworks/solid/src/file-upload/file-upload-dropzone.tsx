import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadDropzoneProps extends HTMLArkProps<'div'> {}

export const FileUploadDropzone = (props: FileUploadDropzoneProps) => {
  const api = useFileUploadContext()
  const mergedProps = mergeProps(() => api().dropzoneProps, props)

  return (
    <>
      <ark.div {...mergedProps} />
      <input {...api().hiddenInputProps} />
    </>
  )
}
