import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadLabelProps extends HTMLArkProps<'label'> {}

export const FileUploadLabel = forwardRef<HTMLLabelElement, FileUploadLabelProps>((props, ref) => {
  const context = useFileUploadContext()
  const mergedProps = mergeProps(context.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

FileUploadLabel.displayName = 'FileUploadLabel'
