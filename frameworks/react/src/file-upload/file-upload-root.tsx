import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useFileUpload, type UseFileUploadProps } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

export interface FileUploadRootProps extends Assign<HTMLArkProps<'div'>, UseFileUploadProps> {}

export const FileUploadRoot = forwardRef<HTMLDivElement, FileUploadRootProps>((props, ref) => {
  const [useFileUploadProps, localProps] = createSplitProps<UseFileUploadProps>()(props, [
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
  const fileUpload = useFileUpload(useFileUploadProps)
  const mergedProps = mergeProps(fileUpload.rootProps, localProps)

  return (
    <FileUploadProvider value={fileUpload}>
      <ark.div {...mergedProps} ref={ref} />
    </FileUploadProvider>
  )
})

FileUploadRoot.displayName = 'FileUploadRoot'
