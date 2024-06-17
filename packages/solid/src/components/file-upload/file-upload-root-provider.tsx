import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseFileUploadReturn } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

interface RootProviderProps {
  value: UseFileUploadReturn
}

export interface FileUploadRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface FileUploadRootProviderProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    RootProviderProps,
    FileUploadRootProviderBaseProps {}

export const FileUploadRootProvider = (props: FileUploadRootProviderProps) => {
  const [{ value: fileUpload }, localProps] = createSplitProps<RootProviderProps>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(() => fileUpload().getRootProps(), localProps)

  return (
    <FileUploadProvider value={fileUpload}>
      <ark.div {...mergedProps} />
    </FileUploadProvider>
  )
}
