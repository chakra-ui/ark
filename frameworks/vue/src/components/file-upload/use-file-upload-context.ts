import { createContext } from '../../utils'
import type { UseFileUploadReturn } from './use-file-upload'

export interface UseFileUploadContext extends UseFileUploadReturn {}

export const [FileUploadProvider, useFileUploadContext] =
  createContext<UseFileUploadContext>('FileUploadContext')
