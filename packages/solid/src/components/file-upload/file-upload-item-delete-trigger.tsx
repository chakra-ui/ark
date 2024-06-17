import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemDeleteTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface FileUploadItemDeleteTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    FileUploadItemDeleteTriggerBaseProps {}

export const FileUploadItemDeleteTrigger = (props: FileUploadItemDeleteTriggerProps) => {
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = mergeProps(() => fileUpload().getItemDeleteTriggerProps(itemProps), props)

  return <ark.button {...mergedProps} />
}
