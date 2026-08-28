'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef, useEffect, useState } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

export interface FileUploadItemPreviewImageBaseProps extends PolymorphicProps {}
export interface FileUploadItemPreviewImageProps extends HTMLProps<'img'>, FileUploadItemPreviewImageBaseProps {}

export const FileUploadItemPreviewImage = forwardRef<HTMLImageElement, FileUploadItemPreviewImageProps>(
  (props, ref) => {
    const [url, setUrl] = useState<string>('')
    const fileUpload = useFileUploadContext()
    const itemProps = useFileUploadItemPropsContext()
    const mergedProps = mergeProps(fileUpload.getItemPreviewImageProps({ ...itemProps, url }), props)

    useEffect(() => {
      return fileUpload.createFileUrl(itemProps.file, (url) => setUrl(url))
    }, [itemProps, fileUpload])

    if (!url) return null

    return <ark.img {...mergedProps} ref={ref} />
  },
)

FileUploadItemPreviewImage.displayName = 'FileUploadItemPreviewImage'
