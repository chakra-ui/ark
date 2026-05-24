'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseImageCropperProps, useImageCropper } from './use-image-cropper.ts'
import { ImageCropperProvider } from './use-image-cropper-context.ts'

export interface ImageCropperRootBaseProps extends UseImageCropperProps, PolymorphicProps {}
export interface ImageCropperRootProps extends HTMLProps<'div'>, ImageCropperRootBaseProps {}

const splitRootProps = createSplitProps<UseImageCropperProps>()

export const ImageCropperRoot = forwardRef<HTMLDivElement, ImageCropperRootProps>((props, ref) => {
  const [useImageCropperProps, localProps] = splitRootProps(props, [
    'aspectRatio',
    'cropShape',
    'defaultFlip',
    'defaultRotation',
    'defaultZoom',
    'fixedCropArea',
    'flip',
    'id',
    'ids',
    'initialCrop',
    'maxHeight',
    'maxWidth',
    'maxZoom',
    'minHeight',
    'minWidth',
    'minZoom',
    'nudgeStep',
    'nudgeStepCtrl',
    'nudgeStepShift',
    'onCropChange',
    'onFlipChange',
    'onRotationChange',
    'onZoomChange',
    'rotation',
    'translations',
    'zoom',
    'zoomSensitivity',
    'zoomStep',
  ])
  const imageCropper = useImageCropper(useImageCropperProps)
  const mergedProps = mergeProps(imageCropper.getRootProps(), localProps)

  return (
    <ImageCropperProvider value={imageCropper}>
      <ark.div {...mergedProps} ref={ref} />
    </ImageCropperProvider>
  )
})

ImageCropperRoot.displayName = 'ImageCropperRoot'
