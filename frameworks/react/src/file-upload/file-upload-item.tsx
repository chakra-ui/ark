import type { ItemProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useFileUploadContext } from './use-file-upload-context'
import { FileUploadItemProvider } from './use-file-upload-item-context'

export interface FileUploadItemProps extends Assign<HTMLArkProps<'ul'>, ItemProps> {}

export const FileUploadItem = forwardRef<HTMLLIElement, FileUploadItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['file'])
  const context = useFileUploadContext()
  const mergedProps = mergeProps(context.getItemProps(itemProps), localProps)

  return (
    <FileUploadItemProvider value={itemProps}>
      <ark.li {...mergedProps} ref={ref} />
    </FileUploadItemProvider>
  )
})

FileUploadItem.displayName = 'FileUploadItem'
