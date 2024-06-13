import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export type FileUploadLabelBaseProps = {}
export interface FileUploadLabelProps extends HTMLArkProps<'label'>, FileUploadLabelBaseProps {}

export const FileUploadLabel = forwardRef<HTMLLabelElement, FileUploadLabelProps>((props, ref) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(fileUpload.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

FileUploadLabel.displayName = 'FileUploadLabel'
