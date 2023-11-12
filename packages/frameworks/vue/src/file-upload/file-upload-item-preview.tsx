import type { ItemPreviewProps } from '@zag-js/file-upload'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreview = defineComponent({
  name: 'FileUploadItemPreview',
  setup(_, { attrs }) {
    const api = useFileUploadContext()
    const item = useFileUploadItemContext()

    try {
      const previewProps = api.value.getItemPreviewProps(item.value as ItemPreviewProps)

      return () => <ark.img {...previewProps} {...attrs} />
    } catch (e) {
      return () => null
    }
  },
})
