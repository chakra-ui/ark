'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperSelectionBaseProps extends PolymorphicProps {}
export interface ImageCropperSelectionProps extends HTMLProps<'div'>, ImageCropperSelectionBaseProps {}

export const ImageCropperSelection = ({ ref, ...props }: ImageCropperSelectionProps) => {
  const imageCropper = useImageCropperContext()
  const mergedProps = mergeProps(imageCropper.getSelectionProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

ImageCropperSelection.displayName = 'ImageCropperSelection'
