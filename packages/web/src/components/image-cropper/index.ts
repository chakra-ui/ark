import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/image-cropper'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type {
  ImageCropperGrid,
  ImageCropperHandle,
  ImageCropperImage,
  ImageCropperSelection,
  ImageCropperViewport,
} from './parts.js'

export type {
  Api as ImageCropperApi,
  CropChangeDetails as ImageCropperCropChangeDetails,
  CropData as ImageCropperCropData,
  FlipState as ImageCropperFlipState,
  GetCroppedImageOptions as ImageCropperGetCroppedImageOptions,
  HandlePosition as ImageCropperHandlePosition,
} from '@zag-js/image-cropper'
export { placements as imageCropperPlacements } from '@zag-js/image-cropper'
export interface ImageCropperElement
  extends
    ActionMethods<Api, 'zoomBy' | 'rotateBy' | 'flipHorizontally' | 'flipVertically' | 'resize' | 'setCrop' | 'reset'>,
    RootElement<Api, Props>,
    Pick<Props, 'ids' | 'translations' | 'initialCrop'>,
    StateProperties<Props, 'zoom' | 'rotation' | 'flip'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-image-cropper': ImageCropperElement
    'ark-image-cropper-viewport': InstanceType<typeof ImageCropperViewport>
    'ark-image-cropper-image': InstanceType<typeof ImageCropperImage>
    'ark-image-cropper-selection': InstanceType<typeof ImageCropperSelection>
    'ark-image-cropper-handle': InstanceType<typeof ImageCropperHandle>
    'ark-image-cropper-grid': InstanceType<typeof ImageCropperGrid>
  }
}

export type ImageCropperEventMap = CallbackEvents<Props>
