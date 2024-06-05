import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseFileUploadReturn } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

interface RootProviderProps {
  value: UseFileUploadReturn
}

export interface FileUploadRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const FileUploadRootProvider = (props: FileUploadRootProviderProps) => {
  const [{ value: fileUpload }, localProps] = createSplitProps<RootProviderProps>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(() => fileUpload().rootProps, localProps)

  return (
    <FileUploadProvider value={fileUpload}>
      <ark.div {...mergedProps} />
    </FileUploadProvider>
  )
}
