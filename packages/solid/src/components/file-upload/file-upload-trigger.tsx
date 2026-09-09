import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFileUploadContext } from './use-file-upload-context.ts'
import type { TriggerState } from '@zag-js/file-upload'

export interface FileUploadTriggerState extends TriggerState {}

export interface FileUploadTriggerBaseProps extends PolymorphicProps<'button', FileUploadTriggerState> {}
export interface FileUploadTriggerProps extends HTMLProps<'button'>, FileUploadTriggerBaseProps {}

export const FileUploadTrigger = (props: FileUploadTriggerProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getTriggerProps(), props)

  return <ark.button {...mergedProps} state={fileUpload().getTriggerState()} />
}
