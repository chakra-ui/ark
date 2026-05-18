import type { ItemProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemGroupPropsContext } from './use-file-upload-item-group-props-context.ts'
import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context.ts'

type ItemBaseProps = Omit<ItemProps, 'type'>

export interface FileUploadItemBaseProps extends ItemBaseProps, PolymorphicProps<'li'> {}
export interface FileUploadItemProps extends HTMLProps<'li'>, FileUploadItemBaseProps {}

export const FileUploadItem = (props: FileUploadItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemBaseProps>()(props, ['file'])
  const fileUpload = useFileUploadContext()

  const itemGroupProps = useFileUploadItemGroupPropsContext()
  const itemPropsWithType = createMemo(() => ({ ...itemProps, type: itemGroupProps.type }))

  const mergedProps = mergeProps(() => fileUpload().getItemProps(itemPropsWithType()), localProps)

  return (
    <FileUploadItemPropsProvider value={itemPropsWithType}>
      <ark.li {...mergedProps} />
    </FileUploadItemPropsProvider>
  )
}
