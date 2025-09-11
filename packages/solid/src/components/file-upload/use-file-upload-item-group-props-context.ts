import type { ItemGroupProps } from '@zag-js/file-upload'
import { createContext } from '../../utils/create-context'

export interface UseFileUploadItemGroupPropsContext extends ItemGroupProps {}

export const [FileUploadItemGroupPropsProvider, useFileUploadItemGroupPropsContext] =
  createContext<UseFileUploadItemGroupPropsContext>({
    hookName: 'useFileUploadItemGroupPropsContext',
    providerName: '<FileUploadItemGroupPropsProvider />',
  })
