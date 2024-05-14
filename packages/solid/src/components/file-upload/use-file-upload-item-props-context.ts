import type { ItemProps } from '@zag-js/file-upload'
import { createContext } from '../../utils/create-context'

export interface UseFileUploadItemPropsContext extends ItemProps {}

export const [FileUploadItemPropsProvider, useFileUploadItemPropsContext] =
  createContext<UseFileUploadItemPropsContext>({
    hookName: 'useFileUploadItemPropsContext',
    providerName: '<FileUploadItemPropsProvider />',
  })
