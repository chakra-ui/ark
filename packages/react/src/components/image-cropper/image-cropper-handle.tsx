'use client'

import type { HandleProps } from '@zag-js/image-cropper'
import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperHandleBaseProps extends PolymorphicProps, HandleProps {}
export interface ImageCropperHandleProps extends HTMLProps<'div'>, ImageCropperHandleBaseProps {}

export const ImageCropperHandle = ({ ref, ...props }: ImageCropperHandleProps) => {
  const { position, ...localProps } = props
  const imageCropper = useImageCropperContext()
  const mergedProps = mergeProps(imageCropper.getHandleProps({ position }), localProps)

  return <ark.div {...mergedProps} ref={ref} />
}

ImageCropperHandle.displayName = 'ImageCropperHandle'
