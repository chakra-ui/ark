import { mergeProps } from '@zag-js/react'
import { forwardRef, useEffect, useState } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewImageProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreviewImage = forwardRef<
  HTMLImageElement,
  FileUploadItemPreviewImageProps
>((props, ref) => {
  const [url, setUrl] = useState<string>('')
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const mergedProps = mergeProps(api.getItemPreviewImageProps({ ...item, url }), props)

  useEffect(() => {
    api.createFileUrl(item.file, (url) => setUrl(url))
  }, [item, api])

  return <ark.img {...mergedProps} ref={ref} />
})

FileUploadItemPreviewImage.displayName = 'FileUploadItemPreviewImage'
