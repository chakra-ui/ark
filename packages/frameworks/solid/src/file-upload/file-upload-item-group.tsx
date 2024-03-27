import { mergeProps } from '@zag-js/solid'
import { type Accessor, type JSX } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useFileUploadContext } from './file-upload-context'

interface ElementProps {
  children?: JSX.Element | ((state: Accessor<File[]>) => JSX.Element)
}

export interface FileUploadItemGroupProps extends Assign<HTMLArkProps<'ul'>, ElementProps> {}

export const FileUploadItemGroup = (props: FileUploadItemGroupProps) => {
  const api = useFileUploadContext()
  const mergedProps = mergeProps(() => api().itemGroupProps, props)
  const getChildren = () => runIfFn(props.children, () => api().files)

  return <ark.ul {...mergedProps}>{getChildren()}</ark.ul>
}
