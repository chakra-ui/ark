'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

export interface FileUploadItemSizeTextBaseProps extends PolymorphicProps {}
export interface FileUploadItemSizeTextProps extends HTMLProps<'div'>, FileUploadItemSizeTextBaseProps {}

export const FileUploadItemSizeText = forwardRef<HTMLDivElement, FileUploadItemSizeTextProps>((props, ref) => {
  const { children, ...rest } = props
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = mergeProps(fileUpload.getItemSizeTextProps(itemProps), rest)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {children || fileUpload.getFileSize(itemProps.file)}
    </ark.div>
  )
})

FileUploadItemSizeText.displayName = 'FileUploadItemSizeText'
