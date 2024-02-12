import { mergeProps } from '@zag-js/solid'
import { createSignal } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewImageProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreviewImage: ArkComponent<'img'> = (
  props: FileUploadItemPreviewImageProps,
) => {
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const [url, setUrl] = createSignal<string>('')
  api().createFileUrl(item.file, (url) => setUrl(url))

  const mergedProps = mergeProps(api().getItemPreviewImageProps({ ...item, url: url() }), props)

  return <ark.img {...mergedProps} />
}
