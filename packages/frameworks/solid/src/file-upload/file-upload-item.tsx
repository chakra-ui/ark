import type { ItemProps } from '@zag-js/file-upload'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useFileUploadContext } from './file-upload-context'
import { FileUploadItemProvider } from './file-upload-item-context'

export interface FileUploadItemProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const FileUploadItem: ArkComponent<'li', ItemProps> = (props) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['file'])
  const api = useFileUploadContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const getChildren = () => runIfFn(localProps.children)

  return (
    <FileUploadItemProvider value={itemProps}>
      <ark.li {...mergedProps}>{getChildren()}</ark.li>
    </FileUploadItemProvider>
  )
}
