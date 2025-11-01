import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseImageCropperProps, useImageCropper } from './use-image-cropper'
import { ImageCropperProvider } from './use-image-cropper-context'

export interface ImageCropperRootBaseProps extends UseImageCropperProps, PolymorphicProps<'div'> {}
export interface ImageCropperRootProps extends HTMLProps<'div'>, ImageCropperRootBaseProps {}

export const ImageCropperRoot = (props: ImageCropperRootProps) => {
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

  const api = useImageCropper(useImageCropperProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <ImageCropperProvider value={api}>
      <ark.div {...mergedProps} />
    </ImageCropperProvider>
  )
}
