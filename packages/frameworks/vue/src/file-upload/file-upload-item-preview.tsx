import type { ItemPreviewProps } from '@zag-js/file-upload'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemPreviewProps extends HTMLArkProps<'img'> {}

export const FileUploadItemPreview = defineComponent({
  name: 'FileUploadItemPreview',
  setup(_, { slots, attrs }) {
    const api = useFileUploadContext()
    const item = useFileUploadItemContext() as ItemPreviewProps

    try {
      return () => (
        <ark.img {...api.value.getItemPreviewProps(item)} {...attrs}>
          {slots.default?.()}
        </ark.img>
      )
    } catch (e) {
      return () => <ark.div />
    }
  },
})
