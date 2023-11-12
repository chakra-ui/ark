import { type ItemPreviewProps } from '@zag-js/file-upload'
import { createContext } from '../context'
import { type Optional } from '../types'

export interface FileUploadItemContext extends Optional<ItemPreviewProps, 'url'> {}

export const [FileUploadItemProvider, useFileUploadItemContext] =
  createContext<FileUploadItemContext>('FileUploadItemContext')
