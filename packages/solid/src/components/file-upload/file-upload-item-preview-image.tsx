import { mergeProps } from '@zag-js/solid'
import { Show, createEffect, createMemo, createSignal, on, onCleanup } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

export interface FileUploadItemPreviewImageBaseProps extends PolymorphicProps<'img'> {}
export interface FileUploadItemPreviewImageProps extends HTMLProps<'img'>, FileUploadItemPreviewImageBaseProps {}

export const FileUploadItemPreviewImage = (props: FileUploadItemPreviewImageProps) => {
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const [url, setUrl] = createSignal<string>('')

  const file = createMemo(() => itemProps().file)

  createEffect(
    on(file, (file) => {
      const cleanup = fileUpload().createFileUrl(file, (url) => setUrl(url))
      onCleanup(cleanup)
    }),
  )

  const mergedProps = mergeProps(() => fileUpload().getItemPreviewImageProps({ ...itemProps(), url: url() }), props)

  return (
    <Show when={url()}>
      <ark.img {...mergedProps} />
    </Show>
  )
}
