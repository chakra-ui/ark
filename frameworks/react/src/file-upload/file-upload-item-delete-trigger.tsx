import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

export interface FileUploadItemDeleteTriggerProps extends HTMLArkProps<'button'> {}

export const FileUploadItemDeleteTrigger = forwardRef<
  HTMLButtonElement,
  FileUploadItemDeleteTriggerProps
>((props, ref) => {
  const context = useFileUploadContext()
  const itemContext = useFileUploadItemContext()
  const mergedProps = mergeProps(context.getItemDeleteTriggerProps(itemContext), props)

  return <ark.button {...mergedProps} ref={ref} />
})

FileUploadItemDeleteTrigger.displayName = 'FileUploadItemDeleteTrigger'
