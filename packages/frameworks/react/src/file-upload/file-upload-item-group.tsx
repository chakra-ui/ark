import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useFileUploadContext } from './file-upload-context'

export interface FileUploadItemGroupProps
  extends Assign<
    HTMLArkProps<'ul'>,
    {
      children?: ReactNode | ((state: File[]) => ReactNode)
    }
  > {}

export const FileUploadItemGroup = forwardRef<HTMLUListElement, FileUploadItemGroupProps>(
  (props, ref) => {
    const { children, ...rest } = props
    const api = useFileUploadContext()
    const mergedProps = mergeProps(api.itemGroupProps, rest)
    const view = runIfFn(children, api.files)

    return (
      <ark.ul {...mergedProps} ref={ref}>
        {view}
      </ark.ul>
    )
  },
)

FileUploadItemGroup.displayName = 'FileUploadItemGroup'
