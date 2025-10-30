import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseImageCropperProps, useImageCropper } from './use-image-cropper'
import { ImageCropperProvider } from './use-image-cropper-context'

export interface ImageCropperRootBaseProps extends UseImageCropperProps, PolymorphicProps {}
export interface ImageCropperRootProps extends HTMLProps<'div'>, ImageCropperRootBaseProps {}

export const ImageCropperRoot = forwardRef<HTMLDivElement, ImageCropperRootProps>((props, ref) => {
  const [useImageCropperProps, localProps] = createSplitProps<UseImageCropperProps>()(props, [
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
