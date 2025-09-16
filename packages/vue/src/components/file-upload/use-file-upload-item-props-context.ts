import type { ItemProps } from '@zag-js/file-upload'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface UseFileUploadItemPropsContext extends ComputedRef<ItemProps> {}

export const [FileUploadItemPropsProvider, useFileUploadItemPropsContext] =
  createContext<UseFileUploadItemPropsContext>('FileUploadItemPropsContext')
