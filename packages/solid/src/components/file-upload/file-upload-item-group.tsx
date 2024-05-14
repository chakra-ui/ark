import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadItemGroupProps extends HTMLArkProps<'ul'> {}

export const FileUploadItemGroup = (props: FileUploadItemGroupProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().itemGroupProps, props)

  return <ark.ul {...mergedProps} />
}
