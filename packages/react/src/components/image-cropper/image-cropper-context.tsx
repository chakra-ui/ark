'use client'

import type { ReactNode } from 'react'
import { type UseImageCropperContext, useImageCropperContext } from './use-image-cropper-context.ts'

export interface ImageCropperContextProps {
  children: (context: UseImageCropperContext) => ReactNode
}

export const ImageCropperContext = (props: ImageCropperContextProps) => props.children(useImageCropperContext())
