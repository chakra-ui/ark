import type { JSX } from '@solidjs/web'
import { type UseImageCropperContext, useImageCropperContext } from './use-image-cropper-context.ts'

export interface ImageCropperContextProps {
  children: (context: UseImageCropperContext) => JSX.Element
}

export const ImageCropperContext = (props: ImageCropperContextProps) => props.children(useImageCropperContext())
