import * as colorPicker from '@zag-js/color-picker'
import { str } from '../../utils/attrs.js'

export const root = 'ark-color-picker'

export const color = (el: Element, name: string) => {
  const value = el.getAttribute(name)
  if (!value) return undefined
  try {
    return colorPicker.parse(value)
  } catch {
    return undefined
  }
}

export const formatOf = (el: Element) => {
  const view = el.closest('ark-color-picker-view')
  return view ? str<colorPicker.ColorFormat>(view, 'format') : undefined
}

export const channelOf = (el: Element) =>
  (el.closest('ark-color-picker-channel-slider')?.getAttribute('channel') ?? 'hue') as colorPicker.ColorChannel

export const channelPropsOf = (el: Element): colorPicker.ChannelSliderProps => {
  const slider = el.closest('ark-color-picker-channel-slider')
  return {
    channel: channelOf(el),
    orientation: slider ? str<'horizontal' | 'vertical'>(slider, 'orientation') : undefined,
    format: slider ? formatOf(slider) : undefined,
  }
}

export const areaPropsOf = (el: Element): colorPicker.AreaProps => {
  const area = el.closest('ark-color-picker-area')
  if (!area) return {}
  return {
    xChannel: str<colorPicker.ColorChannel>(area, 'x-channel'),
    yChannel: str<colorPicker.ColorChannel>(area, 'y-channel'),
  }
}

export const respectAlphaOf = (el: Element | null) =>
  el?.hasAttribute('respect-alpha') ? el.getAttribute('respect-alpha') !== 'false' : undefined

export const swatchPropsOf = (api: colorPicker.Api, el: Element): colorPicker.SwatchProps | undefined => {
  const swatch = el.closest('ark-color-picker-swatch, ark-color-picker-value-swatch, ark-color-picker-swatch-trigger')
  if (swatch?.localName === 'ark-color-picker-value-swatch') {
    return { value: api.valueAsString, respectAlpha: respectAlphaOf(swatch) }
  }
  const value = swatch?.getAttribute('value') || el.closest('ark-color-picker-swatch-trigger')?.getAttribute('value')
  return value ? { value, respectAlpha: respectAlphaOf(swatch) } : undefined
}

export const autoText = new WeakSet<HTMLElement>()
export const markAutoText = (el: HTMLElement) => {
  if (!el.firstChild) autoText.add(el)
}
