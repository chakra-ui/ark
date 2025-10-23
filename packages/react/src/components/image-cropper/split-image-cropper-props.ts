import { createSplitProps } from '../../utils/create-split-props'
import type { UseImageCropperProps } from './use-image-cropper'

export const splitImageCropperProps = <T extends UseImageCropperProps>(props: T) =>
  createSplitProps<UseImageCropperProps>()(props, [
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
