import { mergeProps } from '@zag-js/solid'
import { children } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useFileUploadContext } from './use-file-upload-context'
import { useFileUploadItemContext } from './use-file-upload-item-context'

export interface FileUploadItemNameProps extends HTMLArkProps<'div'> {}

export const FileUploadItemName = (props: FileUploadItemNameProps) => {
  const api = useFileUploadContext()
  const item = useFileUploadItemContext()
  const mergedProps = mergeProps(() => api().getItemNameProps(item), props)
  // @ts-expect-error TODO fix
  const getChildren = children(() => props.children)

  return <ark.div {...mergedProps}>{getChildren() || item.file.name}</ark.div>
}
