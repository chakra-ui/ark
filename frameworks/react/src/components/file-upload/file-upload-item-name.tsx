import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemPropsContext } from './use-file-upload-item-props-context'

export interface FileUploadItemNameProps extends HTMLArkProps<'div'> {}

export const FileUploadItemName = forwardRef<HTMLDivElement, FileUploadItemNameProps>(
  (props, ref) => {
    const { children, ...rest } = props
    const fileUpload = useFileUploadContext()
    const itemProps = useFileUploadItemPropsContext()
    const mergedProps = mergeProps(fileUpload.getItemNameProps(itemProps), rest)

    return (
      <ark.div {...mergedProps} ref={ref}>
        {children || itemProps.file.name}
      </ark.div>
    )
  },
)

FileUploadItemName.displayName = 'FileUploadItemName'
