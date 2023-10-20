import type { ItemProps } from '@zag-js/file-upload'
import { createContext } from '../create-context'

export interface FileUploadItemContext extends ItemProps {}

export const [FileUploadItemProvider, useFileUploadItemContext] =
  createContext<FileUploadItemContext>({
    name: 'FileUploadItemContext',
    hookName: 'useFileUploadItemContext',
    providerName: '<FileUploadItemProvider />',
  })
