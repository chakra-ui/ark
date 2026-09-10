'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import type { ImageState } from '@zag-js/image-cropper'

export interface ImageCropperImageState extends ImageState {}

export interface ImageCropperImageBaseProps extends PolymorphicProps<ImageCropperImageState> {}
export interface ImageCropperImageProps extends HTMLProps<'img'>, ImageCropperImageBaseProps {}

export const ImageCropperImage = forwardRef<HTMLImageElement, ImageCropperImageProps>((props, ref) => {
  const imageCropper = useImageCropperContext()
  const mergedProps = mergeProps(imageCropper.getImageProps(), props)

  return <ark.img {...mergedProps} ref={ref} state={imageCropper.getImageState()} />
})

ImageCropperImage.displayName = 'ImageCropperImage'
