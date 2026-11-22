import * as imageCropper from '@zag-js/image-cropper'

import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { flipOf, ratioOf, root } from './shared.js'

defineRoot<imageCropper.Api>({
  tag: root,
  machine: imageCropper.machine,
  connect: imageCropper.connect,

  attributes: [
    'zoom',
    'default-zoom',
    'rotation',
    'default-rotation',
    'flip',
    'default-flip',
    'aspect-ratio',
    'crop-shape',
    'min-width',
    'min-height',
    'max-width',
    'max-height',
    'zoom-step',
    'zoom-sensitivity',
    'min-zoom',
    'max-zoom',
    'nudge-step',
    'nudge-step-shift',
    'nudge-step-ctrl',
    'fixed-crop-area',
    'dir',
  ],
  properties: ['ids', 'translations', 'initialCrop'],
  state: {
    zoom: {
      get: (api) => api.zoom,
      set: (api, zoom) => api.setZoom(Number(zoom)),
    },
    rotation: {
      get: (api) => api.rotation,
      set: (api, rotation) => api.setRotation(Number(rotation)),
    },
    flip: {
      get: (api) => api.flip,
      set: (api, flip) => api.setFlip(flip),
    },
  },
  actions: {
    zoomBy: (api, delta: number) => api.zoomBy(delta),
    rotateBy: (api, degrees: number) => api.rotateBy(degrees),
    flipHorizontally: (api, value?: boolean) => api.flipHorizontally(value),
    flipVertically: (api, value?: boolean) => api.flipVertically(value),
    resize: (api, placement: imageCropper.HandlePosition, delta: number) => api.resize(placement, delta),
    setCrop: (api, crop: imageCropper.CropChangeDetails['crop']) => api.setCrop(crop),
    reset: (api) => api.reset(),
  },
  props: (el) => ({
    zoom: num(el, 'zoom'),
    defaultZoom: num(el, 'default-zoom'),
    rotation: num(el, 'rotation'),
    defaultRotation: num(el, 'default-rotation'),
    flip: flipOf(el, 'flip'),
    defaultFlip: flipOf(el, 'default-flip'),
    aspectRatio: ratioOf(el),
    cropShape: str<'rectangle' | 'circle'>(el, 'crop-shape'),
    minWidth: num(el, 'min-width'),
    minHeight: num(el, 'min-height'),
    maxWidth: num(el, 'max-width'),
    maxHeight: num(el, 'max-height'),
    zoomStep: num(el, 'zoom-step'),
    zoomSensitivity: num(el, 'zoom-sensitivity'),
    minZoom: num(el, 'min-zoom'),
    maxZoom: num(el, 'max-zoom'),
    nudgeStep: num(el, 'nudge-step'),
    nudgeStepShift: num(el, 'nudge-step-shift'),
    nudgeStepCtrl: num(el, 'nudge-step-ctrl'),
    fixedCropArea: el.hasAttribute('fixed-crop-area'),
    dir: str<'ltr' | 'rtl'>(el, 'dir'),
  }),

  events: {
    onZoomChange: 'zoomchange',
    onRotationChange: 'rotationchange',
    onFlipChange: 'flipchange',
    onCropChange: 'cropchange',
  },

  rootProps: (api) => api.getRootProps(),
})
