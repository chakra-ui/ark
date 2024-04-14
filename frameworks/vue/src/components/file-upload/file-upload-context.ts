import { createContext } from '../../utils/context'
import type { UseFileUploadReturn } from './use-file-upload'

export interface FileUploadContext extends UseFileUploadReturn {}

export const [FileUploadProvider, useFileUploadContext] =
  createContext<FileUploadContext>('FileUploadContext')
