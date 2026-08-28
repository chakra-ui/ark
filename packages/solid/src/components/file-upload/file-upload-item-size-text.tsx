import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

export interface FileUploadItemSizeTextBaseProps extends PolymorphicProps<'div'> {}
export interface FileUploadItemSizeTextProps extends HTMLProps<'div'>, FileUploadItemSizeTextBaseProps {}

export const FileUploadItemSizeText = (props: FileUploadItemSizeTextProps) => {
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = mergeProps(() => fileUpload().getItemSizeTextProps(itemProps()), props)

  return <ark.div {...mergedProps}>{props.children || fileUpload().getFileSize(itemProps().file)}</ark.div>
}
