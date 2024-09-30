import { mergeProps } from '@zag-js/solid'
import { createEffect, createSignal, onCleanup } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemPreviewImageBaseProps extends PolymorphicProps<'img'> {}
export interface FileUploadItemPreviewImageProps
  extends HTMLProps<'img'>,
    FileUploadItemPreviewImageBaseProps {}

export const FileUploadItemPreviewImage = (props: FileUploadItemPreviewImageProps) => {
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const [url, setUrl] = createSignal<string>('')

  createEffect(() => {
    const cleanup = fileUpload().createFileUrl(itemProps.file, (url) => setUrl(url))
    onCleanup(cleanup)
  })

  const mergedProps = mergeProps(
    fileUpload().getItemPreviewImageProps({ ...itemProps, url: url() }),
    props,
  )

  return <ark.img {...mergedProps} />
}
