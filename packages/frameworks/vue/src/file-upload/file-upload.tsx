import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { FileUploadProvider } from './file-upload-context'
import { emits, props } from './file-upload.props'
import { useFileUpload, type UseFileUploadProps } from './use-file-upload'

export interface FileUploadProps extends Assign<HTMLArkProps<'div'>, UseFileUploadProps> {}

export const FileUpload = defineComponent<FileUploadProps>(
  (props, { slots, attrs, emit }) => {
    const api = useFileUpload(props, emit)
    FileUploadProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'FileUpload',
    props,
    emits,
  },
)
