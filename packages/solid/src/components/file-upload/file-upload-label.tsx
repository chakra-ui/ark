import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadLabelBaseProps extends PolymorphicProps<'label'> {}
export interface FileUploadLabelProps extends HTMLProps<'label'>, FileUploadLabelBaseProps {}

export const FileUploadLabel = (props: FileUploadLabelProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
