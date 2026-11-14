import type { JSX } from '@solidjs/web'
import { type UseFileUploadContext, useFileUploadContext } from './use-file-upload-context.ts'

export interface FileUploadContextProps {
  children: (context: UseFileUploadContext) => JSX.Element
}

export const FileUploadContext = (props: FileUploadContextProps) => props.children(useFileUploadContext())
