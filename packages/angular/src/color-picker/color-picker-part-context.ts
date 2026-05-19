import type * as colorPicker from '@zag-js/color-picker'
import { InjectionToken, computed, inject, type Signal } from '@angular/core'

export const ARK_COLOR_PICKER_AREA_PROPS = new InjectionToken<Signal<colorPicker.AreaProps>>(
  'ARK_COLOR_PICKER_AREA_PROPS',
)
export const ARK_COLOR_PICKER_CHANNEL_PROPS = new InjectionToken<Signal<colorPicker.ChannelProps>>(
  'ARK_COLOR_PICKER_CHANNEL_PROPS',
)
export const ARK_COLOR_PICKER_SWATCH_PROPS = new InjectionToken<Signal<colorPicker.SwatchProps>>(
  'ARK_COLOR_PICKER_SWATCH_PROPS',
)
export const ARK_COLOR_PICKER_FORMAT_PROPS = new InjectionToken<
  Signal<{ format: colorPicker.ColorFormat } | undefined>
>('ARK_COLOR_PICKER_FORMAT_PROPS')

export function injectColorPickerAreaProps(): Signal<colorPicker.AreaProps> {
  return inject(ARK_COLOR_PICKER_AREA_PROPS)
}

export function injectColorPickerChannelSliderProps(): Signal<colorPicker.ChannelSliderProps> {
  const channelProps = inject(ARK_COLOR_PICKER_CHANNEL_PROPS)
  const formatProps = inject(ARK_COLOR_PICKER_FORMAT_PROPS, { optional: true })
  return computed(() => ({
    ...channelProps(),
    ...(formatProps?.() ?? {}),
  }))
}

export function injectColorPickerChannelProps(): Signal<colorPicker.ChannelProps> {
  return inject(ARK_COLOR_PICKER_CHANNEL_PROPS)
}

export function injectColorPickerSwatchProps(): Signal<colorPicker.SwatchProps> {
  return inject(ARK_COLOR_PICKER_SWATCH_PROPS)
}
