import type { GridProps } from '@zag-js/image-cropper'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useImageCropperContext } from './use-image-cropper-context'

export interface ImageCropperGridBaseProps extends PolymorphicProps, GridProps {}
export interface ImageCropperGridProps extends HTMLProps<'div'>, ImageCropperGridBaseProps {}

export const ImageCropperGrid = forwardRef<HTMLDivElement, ImageCropperGridProps>((props, ref) => {
  const { axis, ...localProps } = props
  const imageCropper = useImageCropperContext()
  const mergedProps = mergeProps(imageCropper.getGridProps({ axis }), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

ImageCropperGrid.displayName = 'ImageCropperGrid'
