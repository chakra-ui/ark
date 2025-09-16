import type { ItemGroupProps } from '@zag-js/file-upload'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface UseFileUploadItemGroupPropsContext extends ComputedRef<ItemGroupProps> {}

export const [FileUploadItemGroupPropsProvider, useFileUploadItemGroupPropsContext] =
  createContext<UseFileUploadItemGroupPropsContext>('FileUploadItemGroupPropsContext')
