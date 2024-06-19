import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseFileUploadProps, useFileUpload } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

export interface FileUploadRootBaseProps extends UseFileUploadProps, PolymorphicProps<'div'> {}
export interface FileUploadRootProps extends HTMLProps<'div'>, FileUploadRootBaseProps {}

export const FileUploadRoot = (props: FileUploadRootProps) => {
  const [fileUploadProps, localProps] = createSplitProps<UseFileUploadProps>()(props, [
    'accept',
    'allowDrop',
    'capture',
    'directory',
    'disabled',
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
  const mergedProps = mergeProps(() => fileUpload().getRootProps(), localProps)

  return (
    <FileUploadProvider value={fileUpload}>
      <ark.div {...mergedProps} />
    </FileUploadProvider>
  )
}
