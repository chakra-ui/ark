import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'

export interface FileUploadItemGroupProps extends HTMLArkProps<'div'> {}

export const FileUploadItemGroup = forwardRef<HTMLDivElement, FileUploadItemGroupProps>(
  (props, ref) => {
    // const api = useFileUploadContext()
    // const mergedProps = mergeProps(api.containerProps, props)

    return <ark.div {...props} ref={ref} />
  },
)

FileUploadItemGroup.displayName = 'FileUploadItemGroup'
