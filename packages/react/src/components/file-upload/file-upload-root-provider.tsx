import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseFileUploadReturn } from './use-file-upload'
import { FileUploadProvider } from './use-file-upload-context'

interface RootProviderProps {
  value: UseFileUploadReturn
}

export interface FileUploadRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FileUploadRootProviderProps
  extends HTMLProps<'div'>,
    FileUploadRootProviderBaseProps {}

export const FileUploadRootProvider = forwardRef<HTMLDivElement, FileUploadRootProviderProps>(
  (props, ref) => {
    const [{ value: fileUpload }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(fileUpload.getRootProps(), localProps)

    return (
      <FileUploadProvider value={fileUpload}>
        <ark.div {...mergedProps} ref={ref} />
      </FileUploadProvider>
    )
  },
)

FileUploadRootProvider.displayName = 'FileUploadRootProvider'
