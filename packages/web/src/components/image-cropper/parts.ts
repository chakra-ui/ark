import type * as imageCropper from '@zag-js/image-cropper'

import { str } from '../../utils/attrs.js'
import { definePart, wrapped } from '../../utils/define.js'
import { root } from './shared.js'

type Api = imageCropper.Api

export const ImageCropperViewport = definePart<Api>({
  tag: 'ark-image-cropper-viewport',
  root,
  props: (api) => api.getViewportProps(),
})

export const ImageCropperImage = definePart<Api, imageCropper.ImageState>({
  tag: 'ark-image-cropper-image',
  root,
  target: wrapped('img'),
  props: (api) => api.getImageProps(),
  state: (api) => api.getImageState(),
})

export const ImageCropperSelection = definePart<Api, imageCropper.SelectionState>({
  tag: 'ark-image-cropper-selection',
  root,
  props: (api) => api.getSelectionProps(),
  state: (api) => api.getSelectionState(),
})

export const ImageCropperHandle = definePart<Api>({
  tag: 'ark-image-cropper-handle',
  root,
  attributes: ['placement'],
  props: (api, el) => api.getHandleProps({ placement: str<imageCropper.HandlePosition>(el, 'placement') ?? 'se' }),
})

export const ImageCropperGrid = definePart<Api>({
  tag: 'ark-image-cropper-grid',
  root,
  attributes: ['axis'],
  props: (api, el) => api.getGridProps({ axis: str<imageCropper.GridProps['axis']>(el, 'axis') ?? 'horizontal' }),
})
