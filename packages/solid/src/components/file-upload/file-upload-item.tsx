import type { ItemProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context'

export interface FileUploadItemBaseProps extends ItemProps, PolymorphicProps<'li'> {}
export interface FileUploadItemProps
  extends JSX.LiHTMLAttributes<HTMLLIElement>,
    FileUploadItemBaseProps {}

export const FileUploadItem = (props: FileUploadItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['file'])
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getItemProps(itemProps), localProps)

  return (
    <FileUploadItemPropsProvider value={itemProps}>
      <ark.li {...mergedProps} />
    </FileUploadItemPropsProvider>
  )
}
