import { defineComponent, ref } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewImageProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreviewImage = defineComponent<FileUploadItemPreviewImageProps>(
  (_, { attrs }) => {
    const api = useFileUploadContext()
    const item = useFileUploadItemContext()
    const url = ref<string>('')

    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    api.value.createFileUrl(item.file, (src) => (url.value = src))

    const previewProps = api.value.getItemPreviewImageProps({ ...item, url: url.value })
    return () => <ark.img {...previewProps} {...attrs} />
  },
  {
    name: 'FileUploadItemPreviewImage',
  },
)
