import { createContext } from '../../utils/create-context.ts'
import type { UseFileUploadReturn } from './use-file-upload.ts'

export interface UseFileUploadContext extends UseFileUploadReturn {}

export const [FileUploadProvider, useFileUploadContext] = createContext<UseFileUploadContext>({
  hookName: 'useFileUploadContext',
  providerName: '<FileUploadProvider />',
})
