import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadItemProps extends HTMLArkProps<'div'> {}

export const FileUploadItem = forwardRef<HTMLDivElement, FileUploadItemProps>((props, ref) => {
  const api = useFileUploadContext()
  // const mergedProps = mergeProps(api.containerProps, props)

  return <ark.div {...props} ref={ref} />
})

FileUploadItem.displayName = 'FileUploadItem'
