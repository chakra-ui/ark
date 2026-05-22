'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperViewportBaseProps extends PolymorphicProps {}
export interface ImageCropperViewportProps extends HTMLProps<'div'>, ImageCropperViewportBaseProps {}

export const ImageCropperViewport = ({ ref, ...props }: ImageCropperViewportProps) => {
  const imageCropper = useImageCropperContext()
  const mergedProps = mergeProps(imageCropper.getViewportProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

ImageCropperViewport.displayName = 'ImageCropperViewport'
