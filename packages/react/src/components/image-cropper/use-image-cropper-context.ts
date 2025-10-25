import { createContext } from '../../utils/create-context'
import type { UseImageCropperReturn } from './use-image-cropper'

export interface UseImageCropperContext extends UseImageCropperReturn {}

export const [ImageCropperProvider, useImageCropperContext] = createContext<UseImageCropperContext>({
  name: 'ImageCropperContext',
  hookName: 'useImageCropperContext',
  providerName: '<ImageCropperProvider />',
})
