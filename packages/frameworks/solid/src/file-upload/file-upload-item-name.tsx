import { mergeProps } from '@zag-js/solid'
import { children } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './file-upload-context'
import { useFileUploadItemContext } from './file-upload-item-context'

export interface FileUploadItemNameProps extends HTMLArkProps<'div'> {}

export const FileUploadItemName: ArkComponent<'div'> = (props) => {
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const mergedProps = mergeProps(() => api().getItemNameProps(item), props)
  const getChildren = children(() => props.children)

  return <ark.div {...mergedProps}>{getChildren() || item.file.name}</ark.div>
}
