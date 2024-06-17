import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemNameBaseProps extends PolymorphicProps<'div'> {}
export interface FileUploadItemNameProps extends HTMLProps<'div'>, FileUploadItemNameBaseProps {}

export const FileUploadItemName = (props: FileUploadItemNameProps) => {
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = mergeProps(() => fileUpload().getItemNameProps(itemProps), props)

  return <ark.div {...mergedProps}>{props.children || itemProps.file.name}</ark.div>
}
