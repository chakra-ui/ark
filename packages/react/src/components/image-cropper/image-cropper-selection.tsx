'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useImageCropperContext } from './use-image-cropper-context.ts'
import type { SelectionState } from '@zag-js/image-cropper'

export interface ImageCropperSelectionState extends SelectionState {}

export interface ImageCropperSelectionBaseProps extends PolymorphicProps<ImageCropperSelectionState> {}
export interface ImageCropperSelectionProps extends HTMLProps<'div'>, ImageCropperSelectionBaseProps {}

export const ImageCropperSelection = forwardRef<HTMLDivElement, ImageCropperSelectionProps>((props, ref) => {
  const imageCropper = useImageCropperContext()
  const mergedProps = mergeProps(imageCropper.getSelectionProps(), props)

  return <ark.div {...mergedProps} ref={ref} state={imageCropper.getSelectionState()} />
})

ImageCropperSelection.displayName = 'ImageCropperSelection'
