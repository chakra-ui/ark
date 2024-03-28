import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useFileUpload, type UseFileUploadProps } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

export interface FileUploadRootProps extends Assign<HTMLArkProps<'div'>, UseFileUploadProps> {}

export const FileUploadRoot = (props: FileUploadRootProps) => {
  const [fileUploadProps, localProps] = createSplitProps<UseFileUploadProps>()(props, [
    'accept',
    'allowDrop',
    'dir',
    'disabled',
    'files',
    'getRootNode',
    'id',
    'ids',
    'locale',
    'maxFiles',
    'maxFileSize',
    'minFileSize',
    'name',
    'onFileAccept',
    'onFileReject',
    'onFilesChange',
    'translations',
    'validate',
  ])

  const api = useFileUpload(fileUploadProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <FileUploadProvider value={api}>
      <ark.div {...mergedProps} />
    </FileUploadProvider>
  )
}
