import type { ItemProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useFileUploadContext } from './use-file-upload-context'
import { FileUploadItemProvider } from './use-file-upload-item-context'

export interface FileUploadItemProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const FileUploadItem = (props: FileUploadItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['file'])
  const api = useFileUploadContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return (
    <FileUploadItemProvider value={itemProps}>
      <ark.li {...mergedProps} />
    </FileUploadItemProvider>
  )
}
