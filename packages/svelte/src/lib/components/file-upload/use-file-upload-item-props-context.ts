import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemProps } from '@zag-js/file-upload'

export interface UseFileUploadItemPropsContext extends Accessor<ItemProps> {}
export const [FileUploadItemPropsProvider, useFileUploadItemPropsContext] =
  createContext<UseFileUploadItemPropsContext>({
    name: 'FileUploadItemPropsContext',
  })
