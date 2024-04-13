import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadTriggerProps extends HTMLArkProps<'button'> {}

export const FileUploadTrigger = (props: FileUploadTriggerProps) => {
  const api = useFileUploadContext()
  const mergedProps = mergeProps(() => api().triggerProps, props)

  return <ark.button {...mergedProps} />
}
