import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadLabelProps extends HTMLArkProps<'label'> {}

export const FileUploadLabel = (props: FileUploadLabelProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
