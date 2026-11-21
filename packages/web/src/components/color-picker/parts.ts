import type * as colorPicker from '@zag-js/color-picker'
import { str } from '../../utils/attrs.js'
import { definePart, ownInput, wrapped, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import {
  areaPropsOf,
  autoText,
  channelOf,
  channelPropsOf,
  formatOf,
  markAutoText,
  root,
  respectAlphaOf,
  swatchPropsOf,
} from './shared.js'

type Api = colorPicker.Api

const swatchTriggerPropsOf = (el: HTMLElement): colorPicker.SwatchTriggerProps | undefined => {
  const value = str(el, 'value')
  return value ? { value, disabled: el.hasAttribute('disabled') || undefined } : undefined
}

export const ColorPickerLabel = definePart<Api>({
  tag: 'ark-color-picker-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const ColorPickerControl = definePart<Api>({
  tag: 'ark-color-picker-control',
  root,
  props: (api) => api.getControlProps(),
})

export const ColorPickerTrigger = definePart<Api, colorPicker.TriggerState>({
  tag: 'ark-color-picker-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
  state: (api) => api.getTriggerState(),
})

export const ColorPickerPositioner = definePresencePart<Api>({
  tag: 'ark-color-picker-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

export const ColorPickerContent = definePresencePart<Api, colorPicker.ContentState>({
  tag: 'ark-color-picker-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const ColorPickerValueText = definePart<Api>({
  tag: 'ark-color-picker-value-text',
  root,
  attributes: ['format'],
  display: 'inline',
  setup: markAutoText,
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    if (!autoText.has(el)) return
    const format = str<Exclude<Parameters<colorPicker.Color['toString']>[0], undefined>>(el, 'format')
    el.textContent = format ? api.value.toString(format) : api.valueAsString
  },
})

export const ColorPickerArea = definePart<Api>({
  tag: 'ark-color-picker-area',
  root,
  attributes: ['x-channel', 'y-channel'],
  props: (api, el) => api.getAreaProps(areaPropsOf(el)),
})

export const ColorPickerAreaBackground = definePart<Api>({
  tag: 'ark-color-picker-area-background',
  root,
  props: (api, el) => api.getAreaBackgroundProps(areaPropsOf(el)),
})

export const ColorPickerAreaThumb = definePart<Api>({
  tag: 'ark-color-picker-area-thumb',
  root,
  props: (api, el) => api.getAreaThumbProps(areaPropsOf(el)),
})

export const ColorPickerChannelSlider = definePart<Api>({
  tag: 'ark-color-picker-channel-slider',
  root,
  attributes: ['channel', 'orientation'],
  props: (api, el) => api.getChannelSliderProps(channelPropsOf(el)),
})

export const ColorPickerChannelSliderTrack = definePart<Api>({
  tag: 'ark-color-picker-channel-slider-track',
  root,
  props: (api, el) => api.getChannelSliderTrackProps(channelPropsOf(el)),
})

export const ColorPickerChannelSliderThumb = definePart<Api>({
  tag: 'ark-color-picker-channel-slider-thumb',
  root,
  props: (api, el) => api.getChannelSliderThumbProps(channelPropsOf(el)),
})

export const ColorPickerChannelSliderLabel = definePart<Api>({
  tag: 'ark-color-picker-channel-slider-label',
  root,
  props: (api, el) => api.getChannelSliderLabelProps(channelPropsOf(el)),
})

export const ColorPickerChannelSliderValueText = definePart<Api>({
  tag: 'ark-color-picker-channel-slider-value-text',
  root,
  display: 'inline',
  setup: markAutoText,
  props: (api, el) => api.getChannelSliderValueTextProps(channelPropsOf(el)),
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = api.getChannelValueText(channelOf(el))
  },
})

export const ColorPickerChannelInput = definePart<Api>({
  tag: 'ark-color-picker-channel-input',
  root,
  attributes: ['channel', 'orientation'],
  target: wrapped('input'),
  props: (api, el) =>
    api.getChannelInputProps({
      channel: (str(el, 'channel') ?? 'hex') as colorPicker.ExtendedColorChannel,
      orientation: str<'horizontal' | 'vertical'>(el, 'orientation'),
    }),
})

export const ColorPickerTransparencyGrid = definePart<Api>({
  tag: 'ark-color-picker-transparency-grid',
  root,
  attributes: ['size'],
  props: (api, el) => api.getTransparencyGridProps({ size: str(el, 'size') }),
})

export const ColorPickerSwatchGroup = definePart<Api>({
  tag: 'ark-color-picker-swatch-group',
  root,
  props: (api) => api.getSwatchGroupProps(),
})

export const ColorPickerSwatchTrigger = definePart<Api, colorPicker.SwatchTriggerState | undefined>({
  tag: 'ark-color-picker-swatch-trigger',
  root,
  attributes: ['value', 'disabled'],
  target: wrappedButton,
  props: (api, el) => {
    const props = swatchTriggerPropsOf(el)
    return props ? api.getSwatchTriggerProps(props) : {}
  },
  state: (api, el) => {
    const props = swatchTriggerPropsOf(el)
    return props ? api.getSwatchTriggerState(props) : undefined
  },
})

export const ColorPickerSwatch = definePart<Api>({
  tag: 'ark-color-picker-swatch',
  root,
  attributes: ['value', 'respect-alpha'],
  props: (api, el) => {
    const props = swatchPropsOf(api, el)
    return props ? api.getSwatchProps(props) : {}
  },
})

export const ColorPickerSwatchIndicator = definePart<Api>({
  tag: 'ark-color-picker-swatch-indicator',
  root,
  props: (api, el) => {
    const props = swatchPropsOf(api, el)
    return props ? api.getSwatchIndicatorProps(props) : {}
  },
})

export const ColorPickerValueSwatch = definePart<Api>({
  tag: 'ark-color-picker-value-swatch',
  root,
  attributes: ['respect-alpha'],
  props: (api, el) => api.getSwatchProps({ value: api.valueAsString, respectAlpha: respectAlphaOf(el) }),
})

export const ColorPickerEyeDropperTrigger = definePart<Api>({
  tag: 'ark-color-picker-eye-dropper-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getEyeDropperTriggerProps(),
})

export const ColorPickerFormatTrigger = definePart<Api>({
  tag: 'ark-color-picker-format-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getFormatTriggerProps(),
})

export const ColorPickerFormatSelect = definePart<Api>({
  tag: 'ark-color-picker-format-select',
  root,
  target: wrapped('select'),
  props: (api) => api.getFormatSelectProps(),
  render: (api, el) => {
    const select = el.querySelector<HTMLSelectElement>(':scope > select')
    if (!select || select.options.length > 0) return
    for (const format of ['rgba', 'hsla', 'hsba']) {
      const option = document.createElement('option')
      option.value = format
      option.textContent = format
      select.append(option)
    }
    select.value = api.format
  },
})

export const ColorPickerView = definePart<Api>({
  tag: 'ark-color-picker-view',
  root,
  attributes: ['format'],
  props: (api, el) => ({ 'data-format': formatOf(el), hidden: api.format !== formatOf(el) }),
})

export const ColorPickerHiddenInput = definePart<Api>({
  tag: 'ark-color-picker-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
