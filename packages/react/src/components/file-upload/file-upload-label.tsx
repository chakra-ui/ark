import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'

export interface FileUploadLabelBaseProps extends PolymorphicProps {}
export interface FileUploadLabelProps extends HTMLProps<'label'>, FileUploadLabelBaseProps {}

export const FileUploadLabel = forwardRef<HTMLLabelElement, FileUploadLabelProps>((props, ref) => {
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(fileUpload.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

FileUploadLabel.displayName = 'FileUploadLabel'
