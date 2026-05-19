import { InjectionToken, inject } from '@angular/core'
import type { UseImageCropperReturn } from './use-image-cropper'

export const ARK_IMAGE_CROPPER_CONTEXT = new InjectionToken<UseImageCropperReturn>('ARK_IMAGE_CROPPER_CONTEXT')

export function injectArkImageCropperContext(): UseImageCropperReturn {
  return inject(ARK_IMAGE_CROPPER_CONTEXT)
}
