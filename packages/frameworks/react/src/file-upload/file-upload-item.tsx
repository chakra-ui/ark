import type { ItemProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useFileUploadContext } from './file-upload-context'
import { FileUploadItemProvider } from './file-upload-item-context'

export interface FileUploadItemProps extends Assign<HTMLArkProps<'ul'>, ItemProps> {}

export const FileUploadItem = forwardRef<HTMLLIElement, FileUploadItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, ['file'])
  const api = useFileUploadContext()
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const view = runIfFn(children, api)

  return (
    <FileUploadItemProvider value={itemProps}>
      <ark.li {...mergedProps} ref={ref}>
        {view}
      </ark.li>
    </FileUploadItemProvider>
  )
})

FileUploadItem.displayName = 'FileUploadItem'
