import { createAnatomy } from '@zag-js/anatomy'
// TODO replace with anatomy from @zag-js/color-picker
// import { anatomy } from '@zag-js/color-picker'

const anatomy = createAnatomy('color-picker', [
  'area',
  'areaThumb',
  'areaGradient',
  'channelSliderTrack',
  'channelSliderTrackBg',
  'channelSliderThumb',
  'channelInput',
  'swatch',
  'swatchBg',
  'content',
  'label',
  'eyeDropTrigger',
])

export const colorPickerAnatomy = anatomy.extendWith('swatchGroup')
export const parts = colorPickerAnatomy.build()
