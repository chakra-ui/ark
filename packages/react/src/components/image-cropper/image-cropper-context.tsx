import type { ReactNode } from 'react'
import { type UseImageCropperContext, useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperContextProps {
  children: (context: UseImageCropperContext) => ReactNode
}

export const ImageCropperContext = (props: ImageCropperContextProps) => props.children(useImageCropperContext())
