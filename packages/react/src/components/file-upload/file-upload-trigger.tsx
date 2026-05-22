'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadTriggerProps extends HTMLProps<'button'>, FileUploadTriggerBaseProps {}

export const FileUploadTrigger = ({ ref, ...props }: FileUploadTriggerProps) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(fileUpload.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
}

FileUploadTrigger.displayName = 'FileUploadTrigger'
