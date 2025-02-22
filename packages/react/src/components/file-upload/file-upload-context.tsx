import type { ReactNode } from 'react'
import { type UseFileUploadContext, useFileUploadContext } from './use-file-upload-context'

export interface FileUploadContextProps {
  children: (context: UseFileUploadContext) => ReactNode
}

export const FileUploadContext = (props: FileUploadContextProps) => props.children(useFileUploadContext())
