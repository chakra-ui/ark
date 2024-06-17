import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadLabelBaseProps extends PolymorphicProps<'label'> {}
export interface FileUploadLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    FileUploadLabelBaseProps {}

export const FileUploadLabel = (props: FileUploadLabelProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
