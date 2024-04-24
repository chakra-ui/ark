import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseFileUploadProps, useFileUpload } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

export interface FileUploadRootProps extends Assign<HTMLArkProps<'div'>, UseFileUploadProps> {}

export const FileUploadRoot = (props: FileUploadRootProps) => {
  const [fileUploadProps, localProps] = createSplitProps<UseFileUploadProps>()(props, [
    'accept',
    'allowDrop',
    'capture',
    'dir',
    'directory',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'locale',
    'maxFiles',
    'maxFileSize',
    'minFileSize',
    'name',
    'onFileAccept',
    'onFileChange',
    'onFileReject',
    'translations',
    'validate',
  ])

  const fileUpload = useFileUpload(fileUploadProps)
  const mergedProps = mergeProps(() => fileUpload().rootProps, localProps)

  return (
    <FileUploadProvider value={fileUpload}>
      <ark.div {...mergedProps} />
    </FileUploadProvider>
  )
}
