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

definePart<Api>({ tag: 'ark-color-picker-label', root, props: (api) => api.getLabelProps() })

definePart<Api>({ tag: 'ark-color-picker-control', root, props: (api) => api.getControlProps() })

definePart<Api>({
  tag: 'ark-color-picker-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
})

definePresencePart<Api>({
  tag: 'ark-color-picker-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<Api>({ tag: 'ark-color-picker-content', root, props: (api) => api.getContentProps() })

definePart<Api>({
  tag: 'ark-color-picker-value-text',
  root,
  display: 'inline',
  setup: markAutoText,
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    if (!autoText.has(el)) return
    const format = str<Exclude<Parameters<colorPicker.Color['toString']>[0], undefined>>(el, 'format')
    el.textContent = format ? api.value.toString(format) : api.valueAsString
  },
})

definePart<Api>({ tag: 'ark-color-picker-area', root, props: (api, el) => api.getAreaProps(areaPropsOf(el)) })

definePart<Api>({
  tag: 'ark-color-picker-area-background',
  root,
  props: (api, el) => api.getAreaBackgroundProps(areaPropsOf(el)),
})

definePart<Api>({
  tag: 'ark-color-picker-area-thumb',
  root,
  props: (api, el) => api.getAreaThumbProps(areaPropsOf(el)),
})

definePart<Api>({
  tag: 'ark-color-picker-channel-slider',
  root,
  props: (api, el) => api.getChannelSliderProps(channelPropsOf(el)),
})

definePart<Api>({
  tag: 'ark-color-picker-channel-slider-track',
  root,
  props: (api, el) => api.getChannelSliderTrackProps(channelPropsOf(el)),
})

definePart<Api>({
  tag: 'ark-color-picker-channel-slider-thumb',
  root,
  props: (api, el) => api.getChannelSliderThumbProps(channelPropsOf(el)),
})

definePart<Api>({
  tag: 'ark-color-picker-channel-slider-label',
  root,
  props: (api, el) => api.getChannelSliderLabelProps(channelPropsOf(el)),
})

definePart<Api>({
  tag: 'ark-color-picker-channel-slider-value-text',
  root,
  display: 'inline',
  setup: markAutoText,
  props: (api, el) => api.getChannelSliderValueTextProps(channelPropsOf(el)),
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = api.getChannelValueText(channelOf(el))
  },
})

definePart<Api>({
  tag: 'ark-color-picker-channel-input',
  root,
  target: wrapped('input'),
  props: (api, el) =>
    api.getChannelInputProps({
      channel: (str(el, 'channel') ?? 'hex') as colorPicker.ExtendedColorChannel,
      orientation: str<'horizontal' | 'vertical'>(el, 'orientation'),
    }),
})

definePart<Api>({
  tag: 'ark-color-picker-transparency-grid',
  root,
  props: (api, el) => api.getTransparencyGridProps({ size: str(el, 'size') }),
})

definePart<Api>({ tag: 'ark-color-picker-swatch-group', root, props: (api) => api.getSwatchGroupProps() })

definePart<Api>({
  tag: 'ark-color-picker-swatch-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => {
    const value = str(el, 'value')
    return value ? api.getSwatchTriggerProps({ value, disabled: el.hasAttribute('disabled') || undefined }) : {}
  },
})

definePart<Api>({
  tag: 'ark-color-picker-swatch',
  root,
  props: (api, el) => {
    const props = swatchPropsOf(api, el)
    return props ? api.getSwatchProps(props) : {}
  },
})

definePart<Api>({
  tag: 'ark-color-picker-swatch-indicator',
  root,
  props: (api, el) => {
    const props = swatchPropsOf(api, el)
    return props ? api.getSwatchIndicatorProps(props) : {}
  },
})

definePart<Api>({
  tag: 'ark-color-picker-value-swatch',
  root,
  props: (api, el) => api.getSwatchProps({ value: api.valueAsString, respectAlpha: respectAlphaOf(el) }),
})

definePart<Api>({
  tag: 'ark-color-picker-eye-dropper-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getEyeDropperTriggerProps(),
})

definePart<Api>({
  tag: 'ark-color-picker-format-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getFormatTriggerProps(),
})

definePart<Api>({
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

definePart<Api>({
  tag: 'ark-color-picker-view',
  root,
  props: (api, el) => ({ 'data-format': formatOf(el), hidden: api.format !== formatOf(el) }),
})

definePart<Api>({
  tag: 'ark-color-picker-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
