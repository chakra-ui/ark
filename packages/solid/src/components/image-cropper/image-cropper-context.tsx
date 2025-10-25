import type { JSX } from 'solid-js'
import { type UseImageCropperContext, useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperContextProps {
  children: (context: UseImageCropperContext) => JSX.Element
}

export const ImageCropperContext = (props: ImageCropperContextProps) => props.children(useImageCropperContext())
