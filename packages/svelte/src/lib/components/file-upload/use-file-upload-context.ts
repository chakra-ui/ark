import { createContext } from '$lib/utils/create-context'
import type { UseFileUploadReturn } from './use-file-upload.svelte'

export interface UseFileUploadContext extends UseFileUploadReturn {}
export const [FileUploadProvider, useFileUploadContext] = createContext<UseFileUploadContext>({
  name: 'FileUploadContext',
})
