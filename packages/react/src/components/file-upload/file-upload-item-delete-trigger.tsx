import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemDeleteTriggerBaseProps extends PolymorphicProps {}
export interface FileUploadItemDeleteTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    FileUploadItemDeleteTriggerBaseProps {}

export const FileUploadItemDeleteTrigger = forwardRef<
  HTMLButtonElement,
  FileUploadItemDeleteTriggerProps
>((props, ref) => {
  const fileUpload = useFileUploadContext()
  const itemProps = useFileUploadItemPropsContext()
  const mergedProps = mergeProps(fileUpload.getItemDeleteTriggerProps(itemProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

FileUploadItemDeleteTrigger.displayName = 'FileUploadItemDeleteTrigger'
