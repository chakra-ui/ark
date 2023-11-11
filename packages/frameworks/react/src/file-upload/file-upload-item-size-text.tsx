import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemSizeTextProps extends HTMLArkProps<'div'> {}

export const FileUploadItemSizeText = forwardRef<HTMLDivElement, FileUploadItemSizeTextProps>(
  (props, ref) => {
    const api = useFileUploadContext()
    const itemProps = useFileUploadItemContext()
    const mergedProps = mergeProps(api.getItemSizeTextProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

FileUploadItemSizeText.displayName = 'FileUploadItemSizeText'
