import { createContext } from '../create-context'
import { type UseFileUploadReturn } from './use-file-upload'

export interface FileUploadContext extends UseFileUploadReturn {}

export const [FileUploadProvider, useFileUploadContext] = createContext<FileUploadContext>({
  name: 'FileUploadContext',
  hookName: 'useFileUploadContext',
  providerName: '<FileUploadProvider />',
})
