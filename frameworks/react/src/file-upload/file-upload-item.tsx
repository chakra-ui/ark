import type { ItemProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useFileUploadContext } from './use-file-upload-context'
import { FileUploadItemPropsProvider } from './use-file-upload-item-props-context'

export interface FileUploadItemProps extends Assign<HTMLArkProps<'ul'>, ItemProps> {}

export const FileUploadItem = forwardRef<HTMLLIElement, FileUploadItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['file'])
  const fileUpload = useFileUploadContext()
  const mergedProps = mergeProps(fileUpload.getItemProps(itemProps), localProps)

  return (
    <FileUploadItemPropsProvider value={itemProps}>
      <ark.li {...mergedProps} ref={ref} />
    </FileUploadItemPropsProvider>
  )
})

FileUploadItem.displayName = 'FileUploadItem'
