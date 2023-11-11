import { type ItemPreviewProps } from '@zag-js/file-upload'
import { createContext } from '../create-context'
import { type Optional } from '../types'

export interface FileUploadItemContext extends Optional<ItemPreviewProps, 'url'> {}

export const [FileUploadItemProvider, useFileUploadItemContext] =
  createContext<FileUploadItemContext>({
    hookName: 'useFileUploadItemContext',
    providerName: '<FileUploadItemProvider />',
  })
