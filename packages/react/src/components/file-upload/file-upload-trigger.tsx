'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFieldContext } from '../field/use-field-context.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import type { TriggerState } from '@zag-js/file-upload'

export interface FileUploadTriggerState extends TriggerState {}

export interface FileUploadTriggerBaseProps extends PolymorphicProps<FileUploadTriggerState> {}
export interface FileUploadTriggerProps extends HTMLProps<'button'>, FileUploadTriggerBaseProps {}

export const FileUploadTrigger = forwardRef<HTMLButtonElement, FileUploadTriggerProps>((props, ref) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(fileUpload.getTriggerProps(), props)
  const field = useFieldContext()

  return (
    <ark.button
      aria-describedby={field?.ariaDescribedby}
      {...mergedProps}
      ref={ref}
      state={fileUpload.getTriggerState()}
    />
  )
})

FileUploadTrigger.displayName = 'FileUploadTrigger'
