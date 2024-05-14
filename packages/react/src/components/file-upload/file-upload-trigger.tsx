import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadTriggerProps extends HTMLArkProps<'button'> {}

export const FileUploadTrigger = forwardRef<HTMLButtonElement, FileUploadTriggerProps>(
  (props, ref) => {
    const fileUpload = useFileUploadContext()
    const mergedProps = mergeProps(fileUpload.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

FileUploadTrigger.displayName = 'FileUploadTrigger'
