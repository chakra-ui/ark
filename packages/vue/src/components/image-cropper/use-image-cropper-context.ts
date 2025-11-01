import type { connect } from '@zag-js/image-cropper'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface UseImageCropperContext extends ComputedRef<ReturnType<typeof connect>> {}

export const [ImageCropperProvider, useImageCropperContext] =
  createContext<UseImageCropperContext>('ImageCropperContext')
