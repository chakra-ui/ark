import { mergeProps } from '@zag-js/solid'
import { createSignal } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewImageProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreviewImage = (props: FileUploadItemPreviewImageProps) => {
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const [url, setUrl] = createSignal<string>('')
  api().createFileUrl(item.file, (url) => setUrl(url))

  try {
    const mergedProps = mergeProps(api().getItemPreviewProps({ ...item, url: url() }), props)
    return <ark.img {...mergedProps} />
  } catch (e) {
    // TODO We could render a fallback component
    return null
  }
}
