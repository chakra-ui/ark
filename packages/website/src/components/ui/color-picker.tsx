import * as Ark from '@ark-ui/react/color-picker'
import { styled } from 'styled-system/jsx'
import { colorPicker, type ColorPickerVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(colorPicker)

export * from '@ark-ui/react/color-picker'
export type ColorPickerProps = Ark.ColorPickerProps & ColorPickerVariantProps

const ColorPickerRoot = withProvider(styled(Ark.ColorPicker.Root))
export const ColorPickerArea = withContext(styled(Ark.ColorPicker.Area), 'area')
export const ColorPickerAreaGradient = withContext(
  styled(Ark.ColorPicker.AreaGradient),
  'areaGradient',
)
export const ColorPickerAreaThumb = withContext(styled(Ark.ColorPicker.AreaThumb), 'areaThumb')
export const ColorPickerChannelInput = withContext(
  styled(Ark.ColorPicker.ChannelInput),
  'channelInput',
)
export const ColorPickerChannelSliderBackground = withContext(
  styled(Ark.ColorPicker.ChannelSliderBackground),
  'channelSliderTrackBackground',
)
export const ColorPickerChannelSliderThumb = withContext(
  styled(Ark.ColorPicker.ChannelSliderThumb),
  'channelSliderThumb',
)
export const ColorPickerChannelSliderTrack = withContext(
  styled(Ark.ColorPicker.ChannelSliderTrack),
  'channelSliderTrack',
)
export const ColorPickerContent = withContext(styled(Ark.ColorPicker.Content), 'content')
export const ColorPickerEyeDropperTrigger = withContext(
  styled(Ark.ColorPicker.EyeDropperTrigger),
  'eyeDropperTrigger',
)
export const ColorPickerSwatch = withContext(styled(Ark.ColorPicker.Swatch), 'swatch')
export const ColorPickerSwatchBackground = withContext(
  styled(Ark.ColorPicker.SwatchBackground),
  'swatchBackground',
)
export const ColorPickerSwatchGroup = withContext(
  styled(Ark.ColorPicker.SwatchGroup),
  'swatchGroup',
)

export const ColorPicker = Object.assign(ColorPickerRoot, {
  Root: ColorPickerRoot,
  Area: ColorPickerArea,
  AreaGradient: ColorPickerAreaGradient,
  AreaThumb: ColorPickerAreaThumb,
  ChannelInput: ColorPickerChannelInput,
  ChannelSliderBackground: ColorPickerChannelSliderBackground,
  ChannelSliderThumb: ColorPickerChannelSliderThumb,
  ChannelSliderTrack: ColorPickerChannelSliderTrack,
  Content: ColorPickerContent,
  EyeDropperTrigger: ColorPickerEyeDropperTrigger,
  Swatch: ColorPickerSwatch,
  SwatchBackground: ColorPickerSwatchBackground,
  SwatchGroup: ColorPickerSwatchGroup,
})
