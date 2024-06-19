import { mergeProps } from '@zag-js/react'
import { forwardRef, useEffect, useState } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemPreviewImageBaseProps extends PolymorphicProps {}
export interface FileUploadItemPreviewImageProps
  extends HTMLProps<'img'>,
    FileUploadItemPreviewImageBaseProps {}

export const FileUploadItemPreviewImage = forwardRef<
  HTMLImageElement,
  FileUploadItemPreviewImageProps
>((props, ref) => {
  const [url, setUrl] = useState<string>('')
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = mergeProps(fileUpload.getItemPreviewImageProps({ ...itemProps, url }), props)

  useEffect(() => {
    fileUpload.createFileUrl(itemProps.file, (url) => setUrl(url))
  }, [itemProps, fileUpload])

  return <ark.img {...mergedProps} ref={ref} />
})

FileUploadItemPreviewImage.displayName = 'FileUploadItemPreviewImage'
