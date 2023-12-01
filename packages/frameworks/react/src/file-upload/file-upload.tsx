import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { FileUploadProvider } from './file-upload-context'
import { useFileUpload, type UseFileUploadProps, type UseFileUploadReturn } from './use-file-upload'

export interface FileUploadProps
  extends Assign<
    HTMLArkProps<'div'>,
    UseFileUploadProps & {
      children?: ((api: UseFileUploadReturn) => ReactNode) | ReactNode
    }
  > {}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>((props, ref) => {
  const [useFileUploadProps, { children, ...divProps }] = createSplitProps<UseFileUploadProps>()(
    props,
    [
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
    ],
  )
  const api = useFileUpload(useFileUploadProps)
  const mergedProps = mergeProps(api.rootProps, divProps)
  const view = runIfFn(children, api)

  return (
    <FileUploadProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </FileUploadProvider>
  )
})

FileUpload.displayName = 'FileUpload'
