import type { ItemGroupProps } from '@zag-js/file-upload'
import { createContext } from '../../utils/create-context'
import type { Accessor } from '$lib/types'

export interface UseFileUploadItemGroupPropsContext extends Accessor<ItemGroupProps> {}

export const [FileUploadItemGroupPropsProvider, useFileUploadItemGroupPropsContext] =
  createContext<UseFileUploadItemGroupPropsContext>({
    name: 'FileUploadItemGroupPropsContext',
    hookName: 'useFileUploadItemGroupPropsContext',
    providerName: '<FileUploadItemGroupPropsProvider />',
  })
