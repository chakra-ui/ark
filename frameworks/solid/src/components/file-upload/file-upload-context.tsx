import type { JSX } from 'solid-js'
import { type UseFileUploadContext, useFileUploadContext } from './use-file-upload-context'

export interface FileUploadContextProps {
  children: (context: UseFileUploadContext) => JSX.Element
}

export const FileUploadContext = (props: FileUploadContextProps) =>
  props.children(useFileUploadContext())
