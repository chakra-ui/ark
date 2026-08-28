'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseImageCropperReturn } from './use-image-cropper.ts'

export interface UseImageCropperContext extends UseImageCropperReturn {}

export const [ImageCropperProvider, useImageCropperContext] = createContext<UseImageCropperContext>({
  name: 'ImageCropperContext',
  hookName: 'useImageCropperContext',
  providerName: '<ImageCropperProvider />',
})
