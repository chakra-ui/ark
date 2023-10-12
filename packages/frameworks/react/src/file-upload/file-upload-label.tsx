import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadLabelProps extends HTMLArkProps<'label'> {}

export const FileUploadLabel = forwardRef<HTMLLabelElement, FileUploadLabelProps>((props, ref) => {
  const api = useFileUploadContext()
  const mergedProps = mergeProps(api.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

FileUploadLabel.displayName = 'FileUploadLabel'
