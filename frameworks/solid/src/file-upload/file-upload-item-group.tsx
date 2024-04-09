import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadItemGroupProps extends HTMLArkProps<'ul'> {}

export const FileUploadItemGroup = (props: FileUploadItemGroupProps) => {
  const api = useFileUploadContext()
  const mergedProps = mergeProps(() => api().itemGroupProps, props)

  return <ark.ul {...mergedProps} />
}
