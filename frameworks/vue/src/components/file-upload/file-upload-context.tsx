import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseFileUploadContext, useFileUploadContext } from './use-file-upload-context'

export type FileUploadContextProps = SlotsType<{
  default: UnwrapRef<UseFileUploadContext>
}>

export const FileUploadContext = defineComponent(
  (_, { slots }) => {
    const fileupload = useFileUploadContext()

    return () => slots.default(fileupload.value)
  },
  {
    name: 'FileUploadContext',
    slots: Object as FileUploadContextProps,
  },
)
