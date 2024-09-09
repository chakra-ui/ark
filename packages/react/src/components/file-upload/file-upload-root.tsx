import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseFileUploadProps, useFileUpload } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

export interface FileUploadRootBaseProps extends UseFileUploadProps, PolymorphicProps {}
export interface FileUploadRootProps extends HTMLProps<'div'>, FileUploadRootBaseProps {}

export const FileUploadRoot = forwardRef<HTMLDivElement, FileUploadRootProps>((props, ref) => {
  const [useFileUploadProps, localProps] = createSplitProps<UseFileUploadProps>()(props, [
    'accept',
    'allowDrop',
    'capture',
    'directory',
    'disabled',
    'id',
    'ids',
    'invalid',
    'locale',
    'maxFiles',
    'maxFileSize',
    'minFileSize',
    'name',
    'onFileAccept',
    'onFileChange',
    'onFileReject',
    'required',
    'translations',
    'validate',
  ])
  const fileUpload = useFileUpload(useFileUploadProps)
  const mergedProps = mergeProps(fileUpload.getRootProps(), localProps)

  return (
    <FileUploadProvider value={fileUpload}>
      <ark.div {...mergedProps} ref={ref} />
    </FileUploadProvider>
  )
})

FileUploadRoot.displayName = 'FileUploadRoot'
