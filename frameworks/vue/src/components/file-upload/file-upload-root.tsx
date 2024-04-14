import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { FileUploadProvider } from './file-upload-context'
import { emits, props } from './file-upload.props'
import { type UseFileUploadProps, useFileUpload } from './use-file-upload'

export interface FileUploadRootProps extends Assign<HTMLArkProps<'div'>, UseFileUploadProps> {}

export const FileUploadRoot = defineComponent<FileUploadRootProps>(
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
    name: 'FileUploadRoot',
    props,
    emits,
  },
)
