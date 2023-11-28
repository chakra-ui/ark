import { defineComponent, ref } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewImageProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreviewImage = defineComponent({
  name: 'FileUploadItemPreviewImage',
  setup(_, { attrs }) {
    const api = useFileUploadContext()
    const item = useFileUploadItemContext()
    const url = ref<string>('')

    api.value.createFileUrl(item.file, (src) => (url.value = src))

    try {
      const previewProps = api.value.getItemPreviewProps({ ...item, url: url.value })
      return () => <ark.img {...previewProps} {...attrs} />
    } catch (e) {
      return () => null
    }
  },
})
