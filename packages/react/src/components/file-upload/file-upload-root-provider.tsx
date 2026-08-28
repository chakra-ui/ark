'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import type { UseFileUploadReturn } from './use-file-upload.ts'
import { FileUploadProvider } from './use-file-upload-context.ts'

interface RootProviderProps {
  value: UseFileUploadReturn
}

export interface FileUploadRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FileUploadRootProviderProps extends HTMLProps<'div'>, FileUploadRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const FileUploadRootProvider = forwardRef<HTMLDivElement, FileUploadRootProviderProps>((props, ref) => {
  const [{ value: fileUpload }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(fileUpload.getRootProps(), localProps)

  return (
    <FileUploadProvider value={fileUpload}>
      <ark.div {...mergedProps} ref={ref} />
    </FileUploadProvider>
  )
})

FileUploadRootProvider.displayName = 'FileUploadRootProvider'
