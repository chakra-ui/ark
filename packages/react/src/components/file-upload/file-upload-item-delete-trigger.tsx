'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useFileUploadContext } from './use-file-upload-context.ts'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context.ts'

export interface FileUploadItemDeleteTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadItemDeleteTriggerProps extends HTMLProps<'button'>, FileUploadItemDeleteTriggerBaseProps {}

export const FileUploadItemDeleteTrigger = forwardRef<HTMLButtonElement, FileUploadItemDeleteTriggerProps>(
  (props, ref) => {
    const fileUpload = useFileUploadContext()
    const itemProps = useFileUploadItemPropsContext()
    const mergedProps = mergeProps(fileUpload.getItemDeleteTriggerProps(itemProps), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

FileUploadItemDeleteTrigger.displayName = 'FileUploadItemDeleteTrigger'
