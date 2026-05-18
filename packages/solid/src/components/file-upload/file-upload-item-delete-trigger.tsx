import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

export interface FileUploadItemDeleteTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface FileUploadItemDeleteTriggerProps extends HTMLProps<'button'>, FileUploadItemDeleteTriggerBaseProps {}

export const FileUploadItemDeleteTrigger = (props: FileUploadItemDeleteTriggerProps) => {
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = mergeProps(() => fileUpload().getItemDeleteTriggerProps(itemProps()), props)

  return <ark.button {...mergedProps} />
}
