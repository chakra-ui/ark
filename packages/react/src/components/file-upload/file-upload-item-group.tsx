'use client'

import { mergeProps } from '@zag-js/react'
import type { ItemGroupProps } from '@zag-js/file-upload'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { FileUploadItemGroupPropsProvider } from './use-file-upload-item-group-props-context.ts'

export interface FileUploadItemGroupBaseProps extends PolymorphicProps, ItemGroupProps {}
export interface FileUploadItemGroupProps extends HTMLProps<'ul'>, FileUploadItemGroupBaseProps {}

const splitItemGroupProps = createSplitProps<ItemGroupProps>()

export const FileUploadItemGroup = forwardRef<HTMLUListElement, FileUploadItemGroupProps>((props, ref) => {
  const [itemGroupProps, localProps] = splitItemGroupProps(props, ['type'])
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(fileUpload.getItemGroupProps(itemGroupProps), localProps)

  return (
    <FileUploadItemGroupPropsProvider value={itemGroupProps}>
      <ark.ul {...mergedProps} ref={ref} />
    </FileUploadItemGroupPropsProvider>
  )
})

FileUploadItemGroup.displayName = 'FileUploadItemGroup'
