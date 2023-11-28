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

  useEffect(() => {
    api.createFileUrl(item.file, (url) => setUrl(url))
  }, [item, api])

  // TODO It works but maybe there is a cleaner way to do this
  try {
    const mergedProps = mergeProps(api.getItemPreviewProps({ ...item, url }), props)
    return <ark.img {...mergedProps} ref={ref} />
  } catch (e) {
    // TODO We could render a fallback component
    return null
  }
})

FileUploadItemPreviewImage.displayName = 'FileUploadItemPreviewImage'
