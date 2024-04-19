import type { ItemProps } from '@zag-js/file-upload'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface UseFileUploadItemPropsContext extends Ref<ItemProps> {}

export const [FileUploadItemPropsProvider, useFileUploadItemPropsContext] =
  createContext<UseFileUploadItemPropsContext>('FileUploadItemPropsContext')
