import type { ItemProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemGroupPropsContext } from './use-file-upload-item-group-props-context'
import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context'

type ItemBaseProps = Omit<ItemProps, 'type'>

export interface FileUploadItemBaseProps extends ItemBaseProps, PolymorphicProps {}
export interface FileUploadItemProps extends HTMLProps<'li'>, FileUploadItemBaseProps {}

export const FileUploadItem = forwardRef<HTMLLIElement, FileUploadItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemBaseProps>()(props, ['file'])
  const fileUpload = useFileUploadContext()

  const itemGroupProps = useFileUploadItemGroupPropsContext()
  const itemPropsWithType = { ...itemProps, type: itemGroupProps.type }

  const mergedProps = mergeProps(fileUpload.getItemProps(itemPropsWithType), localProps)

  return (
    <FileUploadItemPropsProvider value={itemPropsWithType}>
      <ark.li {...mergedProps} ref={ref} />
    </FileUploadItemPropsProvider>
  )
})

FileUploadItem.displayName = 'FileUploadItem'
