import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemPreviewBaseProps extends PolymorphicProps<'div'> {
  /**
   * The file type to match against. Matches all file types by default.
   * @default '.*'
   */
  type?: string
}
export interface FileUploadItemPreviewProps
  extends HTMLProps<'div'>,
    FileUploadItemPreviewBaseProps {}

export const FileUploadItemPreview = (props: FileUploadItemPreviewProps) => {
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = mergeProps(() => fileUpload().getItemPreviewProps(itemProps), props)

  if (!itemProps.file.type.match(props.type ?? '.*')) return null

  return <ark.div {...mergedProps} />
}
