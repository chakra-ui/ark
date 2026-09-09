import { mergeProps } from '@zag-js/solid'
import type { ItemGroupProps, ItemGroupState } from '@zag-js/file-upload'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { FileUploadItemGroupPropsProvider } from './use-file-upload-item-group-props-context.ts'

export interface FileUploadItemGroupState extends ItemGroupState {}

export interface FileUploadItemGroupBaseProps
  extends PolymorphicProps<'ul', FileUploadItemGroupState>, ItemGroupProps {}
export interface FileUploadItemGroupProps extends HTMLProps<'ul'>, FileUploadItemGroupBaseProps {}

export const FileUploadItemGroup = (props: FileUploadItemGroupProps) => {
  const [itemGroupProps, localProps] = createSplitProps<ItemGroupProps>()(props, ['type'])
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(() => fileUpload().getItemGroupProps(itemGroupProps), localProps)

  return (
    <FileUploadItemGroupPropsProvider value={itemGroupProps}>
      <ark.ul {...mergedProps} state={fileUpload().getItemGroupState(itemGroupProps)} />
    </FileUploadItemGroupPropsProvider>
  )
}
