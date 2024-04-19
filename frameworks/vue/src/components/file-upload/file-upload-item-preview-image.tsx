import { defineComponent, ref } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemPreviewImageProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreviewImage = defineComponent<FileUploadItemPreviewImageProps>(
  (_, { attrs }) => {
    const api = useFileUploadContext()
    const itemProps = useFileUploadItemPropsContext()
    const url = ref<string>('')

    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    api.value.createFileUrl(itemProps.file, (src) => (url.value = src))

    const previewProps = api.value.getItemPreviewImageProps({ ...itemProps, url: url.value })
    return () => <ark.img {...previewProps} {...attrs} />
  },
  {
    name: 'FileUploadItemPreviewImage',
  },
)
