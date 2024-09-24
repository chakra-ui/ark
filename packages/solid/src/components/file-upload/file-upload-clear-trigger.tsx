import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface FileUploadClearTriggerProps
  extends HTMLProps<'button'>,
    FileUploadClearTriggerBaseProps {}

export const FileUploadClearTrigger = (props: FileUploadClearTriggerProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
