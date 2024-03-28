import { mergeProps } from '@zag-js/react'
import { forwardRef, useEffect, useState } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

export interface FileUploadItemPreviewImageProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreviewImage = forwardRef<
  HTMLImageElement,
  FileUploadItemPreviewImageProps
>((props, ref) => {
  const [url, setUrl] = useState<string>('')
  const context = useFileUploadContext()
  const itemContext = useFileUploadItemContext()
  const mergedProps = mergeProps(context.getItemPreviewImageProps({ ...itemContext, url }), props)

  useEffect(() => {
    context.createFileUrl(itemContext.file, (url) => setUrl(url))
  }, [itemContext, context])

  return <ark.img {...mergedProps} ref={ref} />
})

FileUploadItemPreviewImage.displayName = 'FileUploadItemPreviewImage'
