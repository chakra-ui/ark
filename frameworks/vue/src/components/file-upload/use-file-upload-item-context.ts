import type { ItemProps } from '@zag-js/file-upload'
import { createContext } from '../../utils'

export interface UseFileUploadItemContext extends ItemProps {}

export const [FileUploadItemProvider, useFileUploadItemContext] =
  createContext<UseFileUploadItemContext>('FileUploadItemContext')
