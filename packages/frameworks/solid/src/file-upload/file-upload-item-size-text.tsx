import { mergeProps } from '@zag-js/solid'
import { children } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemSizeTextProps extends HTMLArkProps<'div'> {}

export const FileUploadItemSizeText: ArkComponent<'div'> = (props) => {
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const mergedProps = mergeProps(() => api().getItemSizeTextProps(item), props)
  const getChildren = children(() => props.children)

  return <ark.div {...mergedProps}>{getChildren() || api().getFileSize(item.file)}</ark.div>
}
