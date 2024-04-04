import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadLabelProps extends HTMLArkProps<'label'> {}

export const FileUploadLabel = (props: FileUploadLabelProps) => {
  const api = useFileUploadContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps()} />
}
