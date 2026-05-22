'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperImageBaseProps extends PolymorphicProps {}
export interface ImageCropperImageProps extends HTMLProps<'img'>, ImageCropperImageBaseProps {}

export const ImageCropperImage = ({ ref, ...props }: ImageCropperImageProps) => {
  const imageCropper = useImageCropperContext()
  const mergedProps = mergeProps(imageCropper.getImageProps(), props)

  return <ark.img {...mergedProps} ref={ref} />
}

ImageCropperImage.displayName = 'ImageCropperImage'
