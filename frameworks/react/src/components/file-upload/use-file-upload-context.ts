import { createContext } from '../../utils/create-context'
import type { UseFileUploadReturn } from './use-file-upload'

export interface UseFileUploadContext extends UseFileUploadReturn {}

export const [FileUploadProvider, useFileUploadContext] = createContext<UseFileUploadContext>({
  name: 'FileUploadContext',
  hookName: 'useFileUploadContext',
  providerName: '<FileUploadProvider />',
})
