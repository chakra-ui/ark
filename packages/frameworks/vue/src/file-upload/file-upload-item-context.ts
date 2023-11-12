import { type ItemPreviewProps } from '@zag-js/file-upload'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import { type Optional } from '../types'

export interface FileUploadItemContext extends ComputedRef<Optional<ItemPreviewProps, 'url'>> {}

export const [FileUploadItemProvider, useFileUploadItemContext] =
  createContext<FileUploadItemContext>('FileUploadItemContext')
