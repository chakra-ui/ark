import { type ItemProps } from '@zag-js/file-upload'
import { createContext } from '../context'

export interface FileUploadItemContext extends ItemProps {}

export const [FileUploadItemProvider, useFileUploadItemContext] =
  createContext<FileUploadItemContext>('FileUploadItemContext')
