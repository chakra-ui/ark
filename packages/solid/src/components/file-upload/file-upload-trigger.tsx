import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFieldContext } from '../field/index.tsx'
import { useFileUploadContext } from './use-file-upload-context.ts'

export interface FileUploadTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface FileUploadTriggerProps extends HTMLProps<'button'>, FileUploadTriggerBaseProps {}

export const FileUploadTrigger = (props: FileUploadTriggerProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getTriggerProps(), props)
  const field = useFieldContext()

  return <ark.button aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
}
