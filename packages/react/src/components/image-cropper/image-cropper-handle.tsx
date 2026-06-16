'use client'

import type { HandleProps } from '@zag-js/image-cropper'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useImageCropperContext } from './use-image-cropper-context.ts'

export interface ImageCropperHandleBaseProps extends PolymorphicProps, HandleProps {}
export interface ImageCropperHandleProps extends HTMLProps<'div'>, ImageCropperHandleBaseProps {}

export const ImageCropperHandle = forwardRef<HTMLDivElement, ImageCropperHandleProps>((props, ref) => {
  const { placement, ...localProps } = props
  const imageCropper = useImageCropperContext()
  const mergedProps = mergeProps(imageCropper.getHandleProps({ placement }), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

ImageCropperHandle.displayName = 'ImageCropperHandle'
