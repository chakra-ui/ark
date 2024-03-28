import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadTriggerProps extends HTMLArkProps<'button'> {}

export const FileUploadTrigger = forwardRef<HTMLButtonElement, FileUploadTriggerProps>(
  (props, ref) => {
    const context = useFileUploadContext()
    const mergedProps = mergeProps(context.triggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

FileUploadTrigger.displayName = 'FileUploadTrigger'
