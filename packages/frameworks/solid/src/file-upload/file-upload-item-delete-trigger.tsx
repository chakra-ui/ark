import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemDeleteTriggerProps extends HTMLArkProps<'button'> {}

export const FileUploadItemDeleteTrigger = (props: FileUploadItemDeleteTriggerProps) => {
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const mergedProps = mergeProps(() => api().getItemDeleteTriggerProps(item), props)

  return <ark.button {...mergedProps} />
}
