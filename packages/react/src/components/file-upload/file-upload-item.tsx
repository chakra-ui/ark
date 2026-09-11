'use client'

import type { ItemProps, ItemState } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemGroupPropsContext } from './use-file-upload-item-group-props-context.ts'
import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context.ts'

type ItemBaseProps = Omit<ItemProps, 'type'>

export interface FileUploadItemState extends ItemState {}

export interface FileUploadItemBaseProps extends ItemBaseProps, PolymorphicProps<FileUploadItemState> {}
export interface FileUploadItemProps extends HTMLProps<'li'>, FileUploadItemBaseProps {}

const splitItemBaseProps = createSplitProps<ItemBaseProps>()

export const FileUploadItem = forwardRef<HTMLLIElement, FileUploadItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemBaseProps(props, ['file'])
  const fileUpload = useFileUploadContext()

  const itemGroupProps = useFileUploadItemGroupPropsContext()
  const itemPropsWithType = { ...itemProps, type: itemGroupProps.type }

  const mergedProps = mergeProps(fileUpload.getItemProps(itemPropsWithType), localProps)

  return (
    <FileUploadItemPropsProvider value={itemPropsWithType}>
      <ark.li {...mergedProps} ref={ref} state={fileUpload.getItemState(itemPropsWithType)} />
    </FileUploadItemPropsProvider>
  )
})

FileUploadItem.displayName = 'FileUploadItem'
