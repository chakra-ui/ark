import { createContext } from '$lib/utils/create-context'
import type { UseImageCropperReturn } from './use-image-cropper.svelte'

export interface UseImageCropperContext extends UseImageCropperReturn {}
export const [ImageCropperProvider, useImageCropperContext] = createContext<UseImageCropperContext>({
  name: 'ImageCropperContext',
})
